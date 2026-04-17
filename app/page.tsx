import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 60;

async function getStats() {
  try {
    const supabase = await createSupabaseServerClient();
    const [{ count: problemsCount }, { count: behavioralCount }, { count: sdCount }, { count: pathsCount }] =
      await Promise.all([
        supabase.from("problems").select("*", { count: "exact", head: true }),
        supabase.from("behavioral_questions").select("*", { count: "exact", head: true }),
        supabase.from("system_design_topics").select("*", { count: "exact", head: true }),
        supabase.from("company_paths").select("*", { count: "exact", head: true }),
      ]);
    return {
      problems: problemsCount ?? 0,
      behavioral: behavioralCount ?? 0,
      systemDesign: sdCount ?? 0,
      paths: pathsCount ?? 0,
    };
  } catch {
    return { problems: 100, behavioral: 20, systemDesign: 15, paths: 10 };
  }
}

export default async function Home() {
  const stats = await getStats();
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-xs text-slate-400 mb-8">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Now in private launch. Join the waitlist.
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          The interview prep platform <br />
          <span className="text-cyan-accent">that teaches you</span> - not just tests.
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Three-tier AI explanations. Company-specific playbooks. Coding, behavioral, and system design
          unified into one platform. Built for candidates who value career integrity.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/waitlist"
            className="rounded-md bg-cyan-500 text-slate-950 px-8 py-3 font-semibold hover:bg-cyan-400 transition"
          >
            Join Waitlist
          </Link>
          <Link
            href="/problems"
            className="rounded-md border border-slate-700 text-slate-200 px-8 py-3 font-semibold hover:border-cyan-500 transition"
          >
            Browse Problems
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 text-center">
        <Stat label="Problems" value={stats.problems} />
        <Stat label="Behavioral" value={stats.behavioral} />
        <Stat label="System Design" value={stats.systemDesign} />
        <Stat label="Company Paths" value={stats.paths} />
      </section>

      <section className="mt-32 grid md:grid-cols-3 gap-8">
        <Feature
          title="Three-tier AI explanations"
          body="Every problem ships ELI5, Intermediate, and Expert explanations. Learn at your level, not someone else's."
        />
        <Feature
          title="Company-specific playbooks"
          body="Meta E5, Google L5, Amazon SDE2, and more. Each path unifies coding, behavioral, and system design into one curriculum."
        />
        <Feature
          title="Asha-aligned positioning"
          body="We are the prep tool for candidates who refuse the stealth-cheat race. Built on integrity. Supported by every major infrastructure provider."
        />
      </section>

      <section className="mt-32 rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to prepare with clarity?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Free tier includes 10 problems per month. Pro and Elite tiers unlock unlimited access, all three AI
          explanation levels, spaced repetition, and company-specific playbooks.
        </p>
        <Link
          href="/waitlist"
          className="inline-block rounded-md bg-cyan-500 text-slate-950 px-8 py-3 font-semibold hover:bg-cyan-400 transition"
        >
          Join Waitlist
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 py-6">
      <div className="text-4xl font-bold text-cyan-300">{value}</div>
      <div className="text-xs uppercase tracking-wider text-slate-500 mt-2">{label}</div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{body}</p>
    </div>
  );
}
