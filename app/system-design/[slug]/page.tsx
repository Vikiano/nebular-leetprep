import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { markdownToHtml } from "@/lib/md";

type Params = Promise<{ slug: string }>;

export default async function SystemDesignDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: t, error } = await supabase
    .from("system_design_topics")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !t) notFound();

  const descHtml = markdownToHtml(t.description_md ?? "");
  const refHtml = t.reference_architecture_md ? markdownToHtml(t.reference_architecture_md) : "";

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-4 text-sm text-slate-400">
        <Link href="/system-design" className="hover:text-cyan-300">System Design</Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <article className="prose-night" dangerouslySetInnerHTML={{ __html: descHtml }} />
      <div className="mt-10 rounded-lg border border-slate-800 bg-slate-900/40 p-6">
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Key concepts</div>
        <div className="flex gap-2 flex-wrap">
          {(t.key_concepts ?? []).map((c: string) => (
            <span key={c} className="text-sm rounded-full border border-slate-700 px-3 py-1 text-slate-300">
              {c}
            </span>
          ))}
        </div>
      </div>
      {refHtml ? (
        <article className="prose-night mt-10" dangerouslySetInnerHTML={{ __html: refHtml }} />
      ) : null}
    </div>
  );
}
