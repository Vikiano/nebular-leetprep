import Link from "next/link";

export const metadata = {
  title: "Blog",
  description:
    "Long-form interview prep essays. Company playbooks, AI-assisted study methodology, behavioral deep dives, system design primers.",
};

type Post = {
  slug: string;
  title: string;
  published: string;
  readTime: string;
  tag: string;
  excerpt: string;
};

const POSTS: Post[] = [
  {
    slug: "why-three-tier-explanations",
    title: "Why we ship three explanation tiers for every problem",
    published: "2026-04-16",
    readTime: "6 min",
    tag: "methodology",
    excerpt:
      "Most prep platforms serve one explanation per problem. That is optimized for the platform, not the learner. Here is why ELI5, Intermediate, and Expert tiers unlock a better curve.",
  },
  {
    slug: "coach-mode-vs-stealth-tools",
    title: "Coach Mode vs stealth interview assistants",
    published: "2026-04-15",
    readTime: "8 min",
    tag: "ethics",
    excerpt:
      "After the Amazon v. Cluely litigation of September 2025 and the expulsion of the Interview Coder founder, the AI-prep market forked. This is the side we picked and why.",
  },
  {
    slug: "amazon-leadership-principles-field-guide",
    title: "Amazon Leadership Principles field guide for interviews in 2026",
    published: "2026-04-12",
    readTime: "14 min",
    tag: "behavioral",
    excerpt:
      "Sixteen principles, thirty-eight question archetypes, and the five-minute STAR template we use internally for Amazon L5 through L7 loops.",
  },
  {
    slug: "system-design-interview-rubric",
    title: "The rubric senior interviewers actually use for system design",
    published: "2026-04-08",
    readTime: "11 min",
    tag: "system-design",
    excerpt:
      "Five axes: scoping, scale math, component choice, data modeling, operational readiness. Each with a 1-5 scale and concrete signals interviewers watch for.",
  },
  {
    slug: "spaced-repetition-for-algorithms",
    title: "Spaced repetition is underused for algorithm prep",
    published: "2026-04-04",
    readTime: "7 min",
    tag: "methodology",
    excerpt:
      "Most candidates reattempt a problem once it is solved and move on. The forgetting curve says you will fail it again in two weeks. Here is the schedule we generate.",
  },
  {
    slug: "meta-e5-coding-signal",
    title: "The Meta E5 coding signal, deconstructed",
    published: "2026-03-28",
    readTime: "9 min",
    tag: "company-playbook",
    excerpt:
      "What Meta E5 interviewers weight in the coding round in 2026 based on twenty-one data points. Three patterns dominate. Medium-grade graph and DP appear more often than top-of-funnel.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Blog</h1>
        <p className="text-slate-400">
          Long-form essays on interview prep methodology, company playbooks, AI-assisted study, behavioral deep dives,
          and system design primers. New drop every week.
        </p>
      </div>
      <div className="space-y-4">
        {POSTS.map((p) => (
          <article
            key={p.slug}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/40 transition"
          >
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
              <span className="rounded-full border border-slate-700 px-2 py-0.5 uppercase tracking-wider">{p.tag}</span>
              <span>{p.published}</span>
              <span>{p.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${p.slug}`} className="hover:text-cyan-300">
                {p.title}
              </Link>
            </h2>
            <p className="text-slate-400 leading-relaxed">{p.excerpt}</p>
          </article>
        ))}
      </div>
      <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Weekly prep drop in your inbox</h3>
        <p className="text-sm text-slate-400 mb-4">
          One essay every Wednesday. No spam. Unsubscribe anytime.
        </p>
        <Link
          href="/waitlist"
          className="inline-block rounded-md bg-cyan-500 text-slate-950 px-6 py-2 font-semibold hover:bg-cyan-400 transition"
        >
          Join the list
        </Link>
      </div>
    </div>
  );
}
