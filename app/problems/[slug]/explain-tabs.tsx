"use client";
import { useState } from "react";
import { markdownToHtml } from "@/lib/md";

type Level = "eli5" | "intermediate" | "expert";

type Source = "anthropic" | "cache" | "fallback-no-key" | "fallback-no-problem" | "fallback-rate-limit" | "fallback-anthropic-error" | string;

type ApiSuccess = {
  body_md: string;
  model: string;
  cached?: boolean;
  source?: Source;
  message?: string;
};

type ApiError = {
  error: string;
  detail?: string;
  details?: unknown;
};

export default function ExplainTabs({ problemSlug }: { problemSlug: string }) {
  const [level, setLevel] = useState<Level>("intermediate");
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState<string | null>(null);
  const [bodyMeta, setBodyMeta] = useState<{ model?: string; source?: Source; message?: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setErr(null);
    setBody(null);
    setBodyMeta(null);
    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ problem_slug: problemSlug, level }),
      });

      // Always read as text first. If the server returns an empty body (e.g.
      // a 504 gateway timeout, or an uncaught throw in a previous build), we
      // produce a readable fallback message instead of a raw JSON parse error.
      const rawText = await res.text();
      let parsed: ApiSuccess | ApiError | null = null;
      if (rawText && rawText.length > 0) {
        try {
          parsed = JSON.parse(rawText) as ApiSuccess | ApiError;
        } catch {
          parsed = null;
        }
      }

      if (!res.ok || parsed === null) {
        const message =
          (parsed && "error" in parsed && parsed.error) ||
          (rawText && rawText.length > 0 ? rawText.slice(0, 200) : "The tutor is warming up. Please try again in a moment.");
        setErr(message);
        return;
      }

      if ("body_md" in parsed && parsed.body_md) {
        setBody(parsed.body_md);
        setBodyMeta({ model: parsed.model, source: parsed.source, message: parsed.message });
      } else if ("error" in parsed) {
        setErr(parsed.error);
      } else {
        setErr("The tutor returned an unexpected response shape. Please try again.");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const descriptions: Record<Level, string> = {
    eli5: "Explain like I have never seen this kind of problem.",
    intermediate: "I know basics. Help me crystallize the pattern.",
    expert: "Give me complexity analysis, tradeoffs, and related problems.",
  };

  const sourceBadge = (source?: Source) => {
    if (!source || source === "anthropic") return null;
    if (source === "cache") return <span className="text-xs text-slate-500">Cached</span>;
    if (source.startsWith("fallback")) {
      return (
        <span className="text-xs rounded-full border border-amber-500/30 bg-amber-500/5 px-2 py-0.5 text-amber-300">
          Static preview
        </span>
      );
    }
    return <span className="text-xs text-slate-500">{source}</span>;
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
              setBodyMeta(null);
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

      {loading ? (
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded bg-slate-800 animate-pulse" />
          <div className="h-3 w-full rounded bg-slate-800 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-slate-800 animate-pulse" />
          <div className="h-3 w-2/3 rounded bg-slate-800 animate-pulse" />
          <p className="text-xs text-slate-500 mt-3">Assembling a {level.toUpperCase()} walkthrough...</p>
        </div>
      ) : body ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            {sourceBadge(bodyMeta?.source)}
            {bodyMeta?.message ? (
              <span className="text-xs text-slate-500 ml-auto">{bodyMeta.message}</span>
            ) : null}
          </div>
          <article
            className="prose-night text-sm"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(body) }}
          />
          <button
            type="button"
            onClick={() => {
              setBody(null);
              setBodyMeta(null);
              setErr(null);
            }}
            className="mt-4 text-xs text-cyan-300 hover:text-cyan-200"
          >
            Regenerate at a different level
          </button>
        </div>
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

      {err ? (
        <div className="mt-3 rounded-md border border-red-500/40 bg-red-500/5 p-3">
          <p className="text-sm text-red-300">{err}</p>
          <button
            type="button"
            onClick={generate}
            className="mt-2 text-xs text-red-200 underline hover:text-red-100"
          >
            Try again
          </button>
        </div>
      ) : null}

      <p className="mt-6 text-xs text-slate-500">
        AI explanations are for self-directed study only. LeetPrep Studio is not for use during live interview assessments.
      </p>
    </div>
  );
}
