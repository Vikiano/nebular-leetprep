import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Company Paths",
  description: "10 company-specific playbooks unifying coding, behavioral, and system design.",
};

export default async function CompanyPathsIndex() {
  const supabase = await createSupabaseServerClient();
  const { data: paths } = await supabase.from("company_paths").select("*").order("slug");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Company Paths</h1>
        <p className="text-slate-400">
          {paths?.length ?? 0} curated playbooks. Each combines coding problems, behavioral questions, and system
          design topics tuned to a specific company and role.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {(paths ?? []).map((p) => (
          <Link
            key={p.slug}
            href={`/companies/${p.slug}`}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/40 transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg">{p.company}</h3>
              <span className="text-sm text-slate-500">{p.role}</span>
            </div>
            <div className="text-sm text-slate-400 flex gap-4">
              <span>{(p.problem_slugs ?? []).length} problems</span>
              <span>{(p.behavioral_slugs ?? []).length} behavioral</span>
              <span>{(p.system_design_slugs ?? []).length} system design</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
