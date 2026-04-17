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
  const { data } = await supabase.from("company_paths").select("slug");
  return (data ?? []).map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: path } = await supabase
    .from("company_paths")
    .select("slug, company, role")
    .or(`slug.eq.${slug},slug_aliases.cs.{${slug}}`)
    .maybeSingle();
  if (!path) {
    return {
      title: `Company path not found -- LeetPrep Studio`,
      description: `The company slug "${slug}" is not in our seeded set. Browse all 10 company paths.`,
      robots: { index: false },
    };
  }
  return {
    title: `${path.company} ${path.role} interview prep -- LeetPrep Studio`,
    description: `Coding problems, behavioral drills, and system design topics tuned for ${path.company} ${path.role} interviews.`,
  };
}

export default async function CompanyPathPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  // Look up by canonical slug OR slug_aliases array membership.
  const { data: path } = await supabase
    .from("company_paths")
    .select("*")
    .or(`slug.eq.${slug},slug_aliases.cs.{${slug}}`)
    .maybeSingle();

  if (!path) notFound();

  // If user hit an alias, permanent redirect to canonical slug for SEO.
  if (path.slug !== slug) {
    redirect(`/companies/${path.slug}`);
  }

  const descHtml = markdownToHtml(path.description_md ?? "");

  const [{ data: problems }, { data: behavioral }, { data: sd }] = await Promise.all([
    supabase.from("problems").select("slug, title, difficulty").in("slug", path.problem_slugs ?? []),
    supabase.from("behavioral_questions").select("slug, prompt").in("slug", path.behavioral_slugs ?? []),
    supabase.from("system_design_topics").select("slug, title").in("slug", path.system_design_slugs ?? []),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-4 flex items-center gap-3 text-sm text-slate-400">
        <Link href="/companies" className="hover:text-cyan-300">Company Paths</Link>
      </div>
      <div className="mb-8 flex items-center gap-3">
        <h1 className="text-4xl font-bold">{path.company}</h1>
        <span className="text-slate-400 text-xl">{path.role}</span>
      </div>
      <article className="prose-night mb-12" dangerouslySetInnerHTML={{ __html: descHtml }} />
      <Section title="Coding problems" count={problems?.length ?? 0}>
        <ul className="space-y-2">
          {(problems ?? []).map((p) => (
            <li key={p.slug}>
              <Link href={`/problems/${p.slug}`} className="flex justify-between p-3 rounded-lg border border-slate-800 hover:border-cyan-500/40">
                <span>{p.title}</span>
                <span className="text-sm text-slate-500">{p.difficulty}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Behavioral" count={behavioral?.length ?? 0}>
        <ul className="space-y-2">
          {(behavioral ?? []).map((b) => (
            <li key={b.slug}>
              <Link href={`/behavioral/${b.slug}`} className="block p-3 rounded-lg border border-slate-800 hover:border-cyan-500/40">
                {b.prompt}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="System design" count={sd?.length ?? 0}>
        <ul className="space-y-2">
          {(sd ?? []).map((s) => (
            <li key={s.slug}>
              <Link href={`/system-design/${s.slug}`} className="block p-3 rounded-lg border border-slate-800 hover:border-cyan-500/40">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <span className="text-sm text-slate-500">({count})</span>
      </div>
      {children}
    </section>
  );
}
