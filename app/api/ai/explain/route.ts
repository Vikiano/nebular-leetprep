import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { explainProblem } from "@/lib/ai/claude";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { getFallbackExplanationOrGeneric } from "@/lib/ai/fallback-explanations";

const Schema = z.object({
  problem_slug: z.string().min(1),
  level: z.enum(["eli5", "intermediate", "expert"]),
});

const FALLBACK_MODEL_LABEL = "nebular-static-fallback";

function jsonOk(body: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

function jsonErr(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...(extra ?? {}) }, { status });
}

export async function POST(req: Request) {
  // Outer try/catch guarantees we ALWAYS return a JSON body with the right shape.
  // The client depends on res.json() succeeding even on error paths.
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonErr("Invalid JSON body", 400);
    }
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return jsonErr("Invalid input", 400, { details: parsed.error.flatten() });
    }
    const { problem_slug, level } = parsed.data;

    // Prefer service-role client for the cache write; fall back to the anon
    // server client (read-only) if the service role key is missing. The
    // explain flow must still return a readable answer either way.
    let canWriteCache = true;
    let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
    try {
      supabase = createSupabaseServiceClient();
    } catch {
      canWriteCache = false;
      supabase = await createSupabaseServerClient();
    }

    const { data: problem, error: problemErr } = await supabase
      .from("problems")
      .select("id, slug, title, prompt_md, topics")
      .eq("slug", problem_slug)
      .single();

    if (problemErr || !problem) {
      // Attempt to still serve a generic fallback if the DB lookup fails.
      const fallback = getFallbackExplanationOrGeneric(problem_slug, []);
      return jsonOk({
        body_md: fallback[level],
        model: FALLBACK_MODEL_LABEL,
        cached: false,
        source: "fallback-no-problem",
        message: "Problem metadata unavailable. Served generic pattern guidance.",
      });
    }

    // Try cache.
    try {
      const { data: cached } = await supabase
        .from("ai_explanations")
        .select("body_md, model, created_at")
        .eq("problem_id", problem.id)
        .eq("level", level)
        .maybeSingle();
      if (cached?.body_md) {
        return jsonOk({
          body_md: cached.body_md,
          model: cached.model ?? "cached",
          cached: true,
          source: "cache",
        });
      }
    } catch {
      // Cache read failure is non-fatal. Continue.
    }

    // Rate limit anonymous users. Failing rate-limiter serves static fallback
    // so the free tier always yields a useful response for the demo.
    const rl = await checkRateLimit({ userId: null, tier: "free" });
    if (!rl.ok) {
      const fallback = getFallbackExplanationOrGeneric(problem.slug, problem.topics ?? []);
      return jsonOk({
        body_md: fallback[level],
        model: FALLBACK_MODEL_LABEL,
        cached: false,
        source: "fallback-rate-limit",
        message: `Daily free-tier AI call limit reached. Static pattern guidance served. Limit resets in 24h.`,
        limit: rl.limit,
        remaining: rl.remaining,
      });
    }

    // If the Anthropic API key is missing, serve the static fallback rather
    // than returning an error. The demo is functional without the key.
    if (!process.env.ANTHROPIC_API_KEY) {
      const fallback = getFallbackExplanationOrGeneric(problem.slug, problem.topics ?? []);
      return jsonOk({
        body_md: fallback[level],
        model: FALLBACK_MODEL_LABEL,
        cached: false,
        source: "fallback-no-key",
        message: "AI inference is warming up. Static pattern guidance served in the meantime.",
      });
    }

    // Live call to Anthropic.
    try {
      const { text, model, inputTokens, outputTokens } = await explainProblem({
        problemTitle: problem.title,
        problemPrompt: problem.prompt_md ?? "",
        level,
      });

      // Best-effort cache write when service role client is available.
      if (canWriteCache) {
        try {
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
        } catch {
          // Cache write failure is non-fatal.
        }
      }

      return jsonOk({
        body_md: text,
        model,
        cached: false,
        source: "anthropic",
      });
    } catch (err) {
      // Anthropic failure still yields a usable response via static fallback.
      const fallback = getFallbackExplanationOrGeneric(problem.slug, problem.topics ?? []);
      return jsonOk({
        body_md: fallback[level],
        model: FALLBACK_MODEL_LABEL,
        cached: false,
        source: "fallback-anthropic-error",
        message: `AI generator unavailable: ${err instanceof Error ? err.message : "unknown error"}. Static pattern guidance served.`,
      });
    }
  } catch (err) {
    // Absolute outermost safety net. Must never return an empty body.
    return jsonErr(
      "Unexpected server error. Please try again.",
      500,
      { detail: err instanceof Error ? err.message : "unknown" }
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
