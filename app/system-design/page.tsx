import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "System Design Topics",
  description: "15 canonical system design topics, from URL shortener to payment systems. Essential for senior+ interviews.",
};

export default async function SystemDesignPage() {
  const supabase = await createSupabaseServerClient();
  const { data: topics } = await supabase
    .from("system_design_topics")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">System Design Topics</h1>
        <p className="text-slate-400">
          {topics?.length ?? 0} canonical system design topics. Each includes problem framing, scale targets,
          and reference architecture.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {(topics ?? []).map((t) => (
          <Link
            key={t.id}
            href={`/system-design/${t.slug}`}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/40 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <DifficultyPill d={t.difficulty} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(t.key_concepts ?? []).slice(0, 4).map((c: string) => (
                <span key={c} className="text-xs rounded-full border border-slate-700 px-2 py-0.5 text-slate-500">
                  {c}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DifficultyPill({ d }: { d: string }) {
  const cls =
    d === "easy"
      ? "bg-green-500/10 text-green-300 border-green-500/30"
      : d === "medium"
        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
        : "bg-red-500/10 text-red-300 border-red-500/30";
  return <span className={`text-xs font-medium rounded-full border px-3 py-1 ${cls}`}>{d}</span>;
}
