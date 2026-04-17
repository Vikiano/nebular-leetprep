import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const WaitlistSchema = z.object({
  email: z.string().email(),
  intended_tier: z.enum(["free", "pro", "elite"]).default("free"),
  target_companies: z.array(z.string()).optional(),
  target_role: z.string().optional().nullable(),
  experience_years: z.number().int().min(0).max(60).optional().nullable(),
  referrer: z.string().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }
  const { email, intended_tier, target_companies, target_role, experience_years, referrer } = parsed.data;

  try {
    const supabase = createSupabaseServiceClient();
    const { error } = await supabase.from("waitlist_entries").upsert(
      {
        email,
        intended_tier,
        target_companies: target_companies ?? [],
        target_role: target_role ?? null,
        experience_years: experience_years ?? null,
        referrer: referrer ?? null,
      },
      { onConflict: "email" }
    );
    if (error) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }

  // Fire-and-forget transactional email via Resend (if key set)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "LeetPrep Studio <hello@nebular.art>",
        to: email,
        subject: "You are on the LeetPrep Studio waitlist",
        text: `Thanks for joining.

You selected the ${intended_tier.toUpperCase()} tier. We will email the moment it unlocks.

In the meantime, browse the public problem library at https://leetprep.nebular.art/problems.

- Nebular Labs`,
      });
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json({ ok: true });
}
