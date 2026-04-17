import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Behavioral Interview Drills",
  description: "Amazon Leadership Principles, Meta values, Google behavioral, Apple craft. STAR framework answers.",
};

export default async function BehavioralPage() {
  const supabase = await createSupabaseServerClient();
  const { data: questions } = await supabase
    .from("behavioral_questions")
    .select("*")
    .order("id", { ascending: true });

  const byCompany: Record<string, typeof questions> = {};
  for (const q of questions ?? []) {
    const key = q.company ?? "generic";
    if (!byCompany[key]) byCompany[key] = [];
    byCompany[key]!.push(q);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Behavioral Drills</h1>
        <p className="text-slate-400">
          {questions?.length ?? 0} questions across Amazon Leadership Principles, Meta values, Google behavioral,
          Apple craft, and cross-company classics. Practice the STAR framework.
        </p>
      </div>
      <div className="space-y-10">
        {Object.entries(byCompany).map(([company, qs]) => (
          <section key={company}>
            <h2 className="text-xl font-semibold mb-4 uppercase tracking-wider text-cyan-300">
              {company === "generic" ? "Cross-Company Classics" : company}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {(qs ?? []).map((q) => (
                <Link
                  key={q.id}
                  href={`/behavioral/${q.slug}`}
                  className="rounded-lg border border-slate-800 bg-slate-900/40 p-5 hover:border-cyan-500/40 transition"
                >
                  <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                    {q.principle ?? "behavioral"}
                  </div>
                  <div className="font-medium">{q.prompt}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
