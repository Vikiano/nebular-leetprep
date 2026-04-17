import Link from "next/link";

export const metadata = {
  title: "Mock Interview",
  description:
    "Self-guided mock interview prompts. Text-mode interactive drills ship with Pro. Voice mode ships with Elite in Phase 2.",
};

type Prompt = {
  id: string;
  track: "coding" | "behavioral" | "system-design";
  level: "phone" | "onsite-coding" | "onsite-sd" | "bar-raiser";
  title: string;
  body: string;
  rubric: string[];
};

const PROMPTS: Prompt[] = [
  {
    id: "coding-1",
    track: "coding",
    level: "phone",
    title: "Array manipulation, warm-up round",
    body: "Given an array of integers, return the length of the longest contiguous subarray containing at most two distinct values. Example: [1,2,1,3,2] -> 3 (the subarray [2,1,3] fails because it has three distinct, but [1,2,1] has two distinct, length 3). Aim for linear time. Narrate your thinking aloud from the first second.",
    rubric: [
      "Clarified constraints within ninety seconds (array size, value range, output format).",
      "Named the pattern (sliding window) before coding.",
      "Wrote running code within fifteen minutes.",
      "Stated time and space complexity without being prompted.",
      "Traced the algorithm through at least one test case.",
    ],
  },
  {
    id: "coding-2",
    track: "coding",
    level: "onsite-coding",
    title: "Tree recursion, onsite-grade",
    body: "Given the root of a binary tree, return the maximum path sum. A path is any sequence of nodes where each adjacent pair is parent-child. The path does not need to include the root. Node values can be negative. Aim for linear time and space proportional to tree height.",
    rubric: [
      "Recognized post-order recursion shape.",
      "Correctly handled negative values (choosing to not extend).",
      "Maintained a global best while returning a local contribution.",
      "Did not over-count the central node.",
      "Traced the algorithm through a tree with mixed positive and negative values.",
    ],
  },
  {
    id: "behavioral-1",
    track: "behavioral",
    level: "bar-raiser",
    title: "Disagreement with a senior stakeholder",
    body: "Tell me about a time you disagreed with a senior stakeholder. What did you do, and what was the outcome? Use the STAR framework (Situation, Task, Action, Result).",
    rubric: [
      "Situation framed in under one minute.",
      "Specific numbers in the Result (scope, duration, impact).",
      "Action is yours, not the team's. Uses 'I' not 'we' for the key move.",
      "Tied back to a principle if interviewing at Amazon, or a value if interviewing at Meta.",
      "Total answer under four minutes, leaving room for follow-ups.",
    ],
  },
  {
    id: "sd-1",
    track: "system-design",
    level: "onsite-sd",
    title: "Design a URL shortener",
    body: "Design a URL shortener at the scale of bit.ly. Thousand shortens per second at peak. Ten thousand redirects per second at peak. Ninety-nine-point-nine percent availability. Latency: p95 redirect under fifty milliseconds.",
    rubric: [
      "Asked clarifying questions about scale, latency, durability before drawing boxes.",
      "Did the capacity math: storage growth per day, read-write ratio, cache hit rate assumption.",
      "Proposed a short-code generator (hash+base62, or counter+base62) and defended the choice.",
      "Separated write path (shorten) from read path (redirect) with a cache.",
      "Addressed at least one operational concern (analytics, abuse detection, custom domains).",
    ],
  },
];

export default function MockInterviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Mock Interview</h1>
        <p className="text-slate-400">
          Four self-guided prompts you can run today. Treat each as a timed drill: 45 minutes for coding, 5 minutes
          for behavioral, 50 minutes for system design. Record yourself, review against the rubric, then iterate.
          Interactive text-mode sessions ship for Pro subscribers. Voice-mode ships for Elite in Phase 2.
        </p>
      </div>

      <div className="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-200">
        <strong>Integrity note.</strong> LeetPrep Studio mock sessions are for self-directed study. If a current or
        prospective employer is running the session or watching, this platform refuses to run. See the{' '}
        <Link href="/legal/acceptable-use" className="underline">
          Acceptable Use Policy
        </Link>{' '}
        for details.
      </div>

      <div className="space-y-4">
        {PROMPTS.map((p) => (
          <article
            key={p.id}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-6"
          >
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="uppercase tracking-wider rounded-full border border-slate-700 px-2 py-0.5">{p.track}</span>
              <span className="uppercase tracking-wider">{p.level}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{p.body}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-cyan-300 hover:text-cyan-200">
                Show self-scoring rubric
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {p.rubric.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="text-cyan-300 mt-0.5">+</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Want interactive mock sessions?</h2>
        <p className="text-slate-400 mb-5">
          Pro subscribers get text-mode interactive mock interviews with follow-up questions, hint scaffolding, and an
          exportable tamper-evident receipt. Elite subscribers get voice-mode mock interviews.
        </p>
        <Link
          href="/waitlist"
          className="inline-block rounded-md bg-cyan-500 text-slate-950 px-6 py-2 font-semibold hover:bg-cyan-400 transition"
        >
          Join the waitlist
        </Link>
      </div>
    </div>
  );
}
