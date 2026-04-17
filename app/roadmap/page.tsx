import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Roadmap",
  description: "The curated DSA roadmap. Work your way from arrays to dynamic programming.",
};

export default async function RoadmapPage() {
  const supabase = await createSupabaseServerClient();
  const { data: nodes } = await supabase
    .from("roadmap_nodes")
    .select("*")
    .order("position", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Roadmap</h1>
        <p className="text-slate-400">
          The curated DSA roadmap. Start at the top, work down. Each node unlocks the next.
        </p>
      </div>
      <div className="space-y-3">
        {(nodes ?? []).map((n, idx) => (
          <div
            key={n.id}
            className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-5 hover:border-cyan-500/40 transition"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-sm font-semibold text-cyan-300">
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="font-medium text-lg">{n.title}</div>
              <div className="text-sm text-slate-500">{n.slug}</div>
            </div>
            <Link
              href={`/problems?topic=${n.slug.split("-")[0]}`}
              className="text-sm text-cyan-300 hover:text-cyan-200"
            >
              Practice
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
