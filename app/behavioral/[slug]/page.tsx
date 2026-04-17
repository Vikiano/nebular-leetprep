import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { markdownToHtml } from "@/lib/md";

type Params = Promise<{ slug: string }>;

export default async function BehavioralDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: q, error } = await supabase
    .from("behavioral_questions")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !q) notFound();

  const structureHtml = q.ideal_answer_structure_md
    ? markdownToHtml(q.ideal_answer_structure_md)
    : "<p>No structured guide provided. Use the STAR framework: Situation, Task, Action, Result.</p>";

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-4 text-sm text-slate-400">
        <Link href="/behavioral" className="hover:text-cyan-300">Behavioral</Link>
      </div>
      <div className="mb-6 flex gap-2 flex-wrap">
        {q.company ? (
          <span className="text-xs rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-cyan-300">
            {q.company}
          </span>
        ) : null}
        {q.principle ? (
          <span className="text-xs rounded-full border border-slate-700 px-3 py-1 text-slate-400">
            {q.principle}
          </span>
        ) : null}
      </div>
      <h1 className="text-3xl font-bold mb-6 leading-snug">{q.prompt}</h1>
      <article className="prose-night" dangerouslySetInnerHTML={{ __html: structureHtml }} />
      <div className="mt-12 rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className="text-sm font-semibold mb-2">Your answer</div>
        <p className="text-sm text-slate-400 mb-3">
          Draft your STAR response. Pro and Elite users get AI feedback on behavioral answers.
        </p>
        <textarea
          className="w-full h-40 text-sm"
          placeholder="Situation... Task... Action... Result..."
        />
        <button
          disabled
          className="mt-3 rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-400 cursor-not-allowed"
        >
          Submit for AI feedback (Pro+)
        </button>
      </div>
    </div>
  );
}
