import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { createSupabaseServerClient, createSupabaseBuildClient } from "@/lib/supabase/server";
import { markdownToHtml } from "@/lib/md";

type Params = Promise<{ slug: string }>;

// Allow dynamic params so aliases (not in generateStaticParams output) still render via server render + redirect.
// notFound() inside the page will return a proper 404 status for truly-unknown slugs.
export const dynamicParams = true;

// Statically generate all canonical slugs at build time. Aliases are handled dynamically at request time.
// Uses a cookie-free client since generateStaticParams runs outside any request scope.
export async function generateStaticParams() {
  const supabase = createSupabaseBuildClient();
  const { data } = await supabase.from("behavioral_questions").select("slug");
  return (data ?? []).map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: q } = await supabase
    .from("behavioral_questions")
    .select("slug, prompt, company, principle")
    .or(`slug.eq.${slug},slug_aliases.cs.{${slug}}`)
    .maybeSingle();
  if (!q) {
    return {
      title: `Behavioral question not found -- LeetPrep Studio`,
      description: `The behavioral slug "${slug}" is not in our seeded set. Browse all 20 behavioral drills.`,
      robots: { index: false },
    };
  }
  const scope = q.company ? `${q.company} ${q.principle ?? "behavioral"}` : "behavioral";
  return {
    title: `${q.prompt.slice(0, 70)} -- LeetPrep Studio`,
    description: `STAR framework answer guide for a ${scope} interview question.`,
  };
}

export default async function BehavioralDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: q } = await supabase
    .from("behavioral_questions")
    .select("*")
    .or(`slug.eq.${slug},slug_aliases.cs.{${slug}}`)
    .maybeSingle();

  if (!q) notFound();

  // Alias hit -> permanent redirect to canonical slug for SEO.
  if (q.slug !== slug) {
    redirect(`/behavioral/${q.slug}`);
  }

  const structureHtml = q.ideal_answer_structure_md
    ? markdownToHtml(q.ideal_answer_structure_md)
    : "<p>No structured guide provided yet. Use the STAR framework: Situation, Task, Action, Result.</p>";

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
