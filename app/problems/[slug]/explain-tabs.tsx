"use client";
import { useState } from "react";

type Level = "eli5" | "intermediate" | "expert";

export default function ExplainTabs({ problemSlug }: { problemSlug: string }) {
  const [level, setLevel] = useState<Level>("intermediate");
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem_slug: problemSlug, level }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Something went wrong.");
      } else {
        setBody(data.body_md);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error.");
    } finally {
      setLoading(false);
    }
  }

  const descriptions: Record<Level, string> = {
    eli5: "Explain like I have never seen this kind of problem.",
    intermediate: "I know basics. Help me crystallize the pattern.",
    expert: "Give me complexity analysis, tradeoffs, and related problems.",
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(["eli5", "intermediate", "expert"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              setLevel(l);
              setBody(null);
              setErr(null);
            }}
            className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-medium transition ${
              level === l
                ? "border-cyan-500 bg-cyan-500/10 text-cyan-200"
                : "border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-400 mb-4">{descriptions[level]}</p>
      {body ? (
        <article className="prose-night text-sm" style={{ whiteSpace: "pre-wrap" }}>
          {body}
        </article>
      ) : (
        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className="w-full rounded-md bg-cyan-500 text-slate-950 px-4 py-2 font-medium hover:bg-cyan-400 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : `Get ${level.toUpperCase()} explanation`}
        </button>
      )}
      {err ? <p className="mt-3 text-sm text-red-400">{err}</p> : null}
      <p className="mt-6 text-xs text-slate-500">
        AI explanations are for self-directed study only. LeetPrep Studio is not for use during live interview assessments.
      </p>
    </div>
  );
}
