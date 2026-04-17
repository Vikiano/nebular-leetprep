import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { explainProblem } from "@/lib/ai/claude";
import { checkRateLimit } from "@/lib/ai/rate-limit";

const Schema = z.object({
  problem_slug: z.string().min(1),
  level: z.enum(["eli5", "intermediate", "expert"]),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { problem_slug, level } = parsed.data;

  const supabase = createSupabaseServiceClient();

  // Check cache first
  const { data: problem, error: problemErr } = await supabase
    .from("problems")
    .select("id, slug, title, prompt_md")
    .eq("slug", problem_slug)
    .single();
  if (problemErr || !problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const { data: cached } = await supabase
    .from("ai_explanations")
    .select("body_md, model, created_at")
    .eq("problem_id", problem.id)
    .eq("level", level)
    .maybeSingle();
  if (cached) {
    return NextResponse.json({
      body_md: cached.body_md,
      model: cached.model,
      cached: true,
    });
  }

  // Rate limit (anonymous users share a bucket)
  const rl = await checkRateLimit({ userId: null, tier: "free" });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Upgrade or wait 24h." },
      { status: 429 }
    );
  }

  // Generate
  try {
    const { text, model, inputTokens, outputTokens } = await explainProblem({
      problemTitle: problem.title,
      problemPrompt: problem.prompt_md,
      level,
    });

    // Cache
    await supabase.from("ai_explanations").upsert(
      {
        problem_id: problem.id,
        level,
        body_md: text,
        model,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
      },
      { onConflict: "problem_id,level" }
    );

    return NextResponse.json({ body_md: text, model, cached: false });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI unavailable" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
