import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Problems",
  description: "Browse the LeetPrep Studio problem library. 100+ algorithm problems with three-tier AI explanations.",
};

type SearchParams = Promise<{
  difficulty?: string;
  topic?: string;
  company?: string;
}>;

export default async function ProblemsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("problems")
    .select("id, slug, title, difficulty, topics, companies")
    .eq("published", true)
    .order("id", { ascending: true });

  if (params.difficulty) query = query.eq("difficulty", params.difficulty);
  if (params.topic) query = query.contains("topics", [params.topic]);
  if (params.company) query = query.contains("companies", [params.company]);

  const { data: problems, error } = await query;

  const difficulties = ["easy", "medium", "hard"];
  const companies = ["meta", "google", "amazon", "apple", "netflix", "microsoft"];
  const topics = ["array", "string", "tree", "graph", "dp", "heap", "backtracking", "sliding-window"];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Problems</h1>
        <p className="text-slate-400">
          {problems?.length ?? 0} problems across {topics.length} topics, tagged by company.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="space-y-6 md:col-span-1">
          <FilterGroup label="Difficulty" current={params.difficulty} options={difficulties} keyName="difficulty" />
          <FilterGroup label="Company" current={params.company} options={companies} keyName="company" />
          <FilterGroup label="Topic" current={params.topic} options={topics} keyName="topic" />
        </aside>

        <section className="md:col-span-3">
          {error ? (
            <div className="rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
              Error loading problems. Please refresh.
            </div>
          ) : (
            <div className="divide-y divide-slate-800 rounded-lg border border-slate-800 bg-slate-900/30">
              {(problems ?? []).map((p) => (
                <Link
                  key={p.id}
                  href={`/problems/${p.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-slate-900/80 transition"
                >
                  <div className="flex-1">
                    <div className="font-medium">{p.title}</div>
                    <div className="mt-1 flex gap-2 flex-wrap">
                      {(p.topics ?? []).slice(0, 3).map((t: string) => (
                        <span key={t} className="text-xs text-slate-500 rounded-full border border-slate-700 px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <DifficultyPill d={p.difficulty} />
                </Link>
              ))}
              {(problems ?? []).length === 0 ? (
                <div className="p-8 text-center text-slate-500">No problems match those filters.</div>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  current,
  options,
  keyName,
}: {
  label: string;
  current?: string;
  options: string[];
  keyName: string;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`?`}
          className={`text-xs rounded-full border px-3 py-1 ${
            !current ? "border-cyan-500 bg-cyan-500/10 text-cyan-200" : "border-slate-700 text-slate-400"
          }`}
        >
          All
        </Link>
        {options.map((o) => (
          <Link
            key={o}
            href={`?${keyName}=${o}`}
            className={`text-xs rounded-full border px-3 py-1 ${
              current === o ? "border-cyan-500 bg-cyan-500/10 text-cyan-200" : "border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            {o}
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
