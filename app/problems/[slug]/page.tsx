import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { markdownToHtml } from "@/lib/md";
import ExplainTabs from "./explain-tabs";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " "),
    description: `Solve ${slug.replace(/-/g, " ")} with three-tier AI explanations.`,
  };
}

export default async function ProblemDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: problem, error } = await supabase
    .from("problems")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !problem) {
    notFound();
  }

  const promptHtml = markdownToHtml(problem.prompt_md ?? "");

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-6 flex items-center gap-3 text-sm text-slate-400">
        <Link href="/problems" className="hover:text-cyan-300">Problems</Link>
        <span>/</span>
        <span className="text-slate-200">{problem.title}</span>
      </div>
      <div className="grid md:grid-cols-5 gap-8">
        <section className="md:col-span-3">
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold">{problem.title}</h1>
            <DifficultyPill d={problem.difficulty} />
          </div>
          <div className="mb-4 flex gap-2 flex-wrap">
            {(problem.topics ?? []).map((t: string) => (
              <span key={t} className="text-xs rounded-full border border-slate-700 px-2.5 py-1 text-slate-400">
                {t}
              </span>
            ))}
          </div>
          <div className="mb-6 flex gap-2 flex-wrap">
            {(problem.companies ?? []).map((c: string) => (
              <span key={c} className="text-xs rounded-full border border-cyan-500/30 bg-cyan-500/5 px-2.5 py-1 text-cyan-300">
                {c}
              </span>
            ))}
          </div>
          <article
            className="prose-night"
            dangerouslySetInnerHTML={{ __html: promptHtml }}
          />
          <div className="mt-10 rounded-lg border border-slate-800 bg-slate-900/40 p-6">
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Solution patterns</div>
            <div className="flex gap-2 flex-wrap">
              {(problem.solution_patterns ?? []).map((p: string) => (
                <span key={p} className="text-xs rounded-full border border-slate-700 px-2.5 py-1 text-slate-300">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>
        <aside className="md:col-span-2">
          <div className="sticky top-24 rounded-lg border border-slate-800 bg-slate-900/60 p-6">
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">AI Tutor</div>
            <ExplainTabs problemSlug={problem.slug} />
          </div>
        </aside>
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
