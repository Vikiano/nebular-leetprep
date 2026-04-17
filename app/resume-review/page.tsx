import Link from "next/link";

export const metadata = {
  title: "Resume Review",
  description:
    "A self-service rubric for tech resumes plus the managed Elite review service.",
};

type RubricItem = {
  dimension: string;
  greatSignal: string;
  weakSignal: string;
};

const RUBRIC: RubricItem[] = [
  {
    dimension: "Impact phrasing",
    greatSignal:
      "Every bullet opens with a verb and ends with a measurable outcome ('Reduced p95 latency from 280ms to 95ms across 12M daily requests').",
    weakSignal:
      "Bullets describe responsibilities ('Responsible for improving API performance') with no number, no baseline, no outcome.",
  },
  {
    dimension: "Role granularity",
    greatSignal:
      "Each role shows two to five bullets, ordered by magnitude of impact, each under twenty-five words.",
    weakSignal:
      "One massive paragraph per role, or ten near-identical bullets that restate the job description.",
  },
  {
    dimension: "Technical depth signal",
    greatSignal:
      "Named technologies are specific ('Postgres 15 with logical replication', 'Kafka with idempotent producer, EOS semantics') and tied to the impact.",
    weakSignal:
      "Generic stack dump at the top with no roles showing which tech actually drove which outcome.",
  },
  {
    dimension: "Scale signal",
    greatSignal:
      "Concrete magnitudes: MB/s, requests per second, users, revenue, teams coordinated, incidents resolved.",
    weakSignal:
      "Vague scale words: 'massive', 'large', 'significant', 'high-performance'.",
  },
  {
    dimension: "Cross-functional signal",
    greatSignal:
      "At least one bullet per role mentions a specific partner function (product, design, DS, ops) and the concrete artifact you co-produced.",
    weakSignal:
      "Pure engineering bullets. No indication you coordinated with humans outside your own team.",
  },
  {
    dimension: "Layout and scannability",
    greatSignal:
      "One page per five years of experience, max two pages. Reverse chronological. Consistent date format. No graphics that break ATS parsing.",
    weakSignal:
      "Columns, sidebars, icons, skill bars, or photos that confuse machine parsing or waste vertical space.",
  },
  {
    dimension: "Tailoring to target",
    greatSignal:
      "Resume matches the target company's role archetype: system-design signal for infra roles, modeling and experimentation signal for DS roles, leadership and scope signal for senior+ roles.",
    weakSignal:
      "Same resume sent to every role regardless of function or seniority.",
  },
];

export default function ResumeReviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Resume Review</h1>
        <p className="text-slate-400">
          Two paths. Grade your own resume with the seven-dimension rubric below today. Or join the waitlist for the
          Elite managed review service, where a senior engineer writes a structured rubric-scored response tailored to
          your specific target company.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Self-service rubric</h2>
        <div className="space-y-4">
          {RUBRIC.map((r) => (
            <div
              key={r.dimension}
              className="rounded-lg border border-slate-800 bg-slate-900/40 p-5"
            >
              <h3 className="font-semibold mb-2">{r.dimension}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-cyan-300 mb-1">Great signal</div>
                  <p className="text-slate-300">{r.greatSignal}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">Weak signal</div>
                  <p className="text-slate-400">{r.weakSignal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8">
        <h2 className="text-xl font-semibold mb-3">Elite managed review</h2>
        <p className="text-slate-400 mb-5">
          Upload your resume and target company. Receive a rubric-scored review tailored to that company's hiring bar,
          plus three concrete rewrites per weak bullet. One per month included with the Elite tier.
        </p>
        <Link
          href="/waitlist?tier=elite"
          className="inline-block rounded-md bg-cyan-500 text-slate-950 px-6 py-2 font-semibold hover:bg-cyan-400 transition"
        >
          Join the Elite waitlist
        </Link>
      </div>
    </div>
  );
}
