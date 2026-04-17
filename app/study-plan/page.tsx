import Link from "next/link";

export const metadata = {
  title: "Study Plan",
  description: "A free first-week plan anyone can follow. Pro subscribers get personalized weekly plans.",
};

type Day = {
  day: string;
  focus: string;
  tasks: { label: string; href?: string }[];
};

const WEEK_ONE: Day[] = [
  {
    day: "Monday",
    focus: "Arrays and two pointers",
    tasks: [
      { label: "Read: Array pattern primer", href: "/blog/spaced-repetition-for-algorithms" },
      { label: "Solve: Two Sum", href: "/problems/two-sum" },
      { label: "Solve: Valid Palindrome", href: "/problems" },
    ],
  },
  {
    day: "Tuesday",
    focus: "Strings and sliding windows",
    tasks: [
      { label: "Review: Sliding window pattern", href: "/problems?topic=sliding-window" },
      { label: "Solve: Longest Substring Without Repeating Characters", href: "/problems" },
      { label: "Solve: Minimum Window Substring", href: "/problems" },
    ],
  },
  {
    day: "Wednesday",
    focus: "Hash maps and frequency counting",
    tasks: [
      { label: "Warm-up: Valid Anagram", href: "/problems" },
      { label: "Solve: Group Anagrams", href: "/problems" },
      { label: "Solve: Top K Frequent Elements", href: "/problems" },
    ],
  },
  {
    day: "Thursday",
    focus: "Linked lists and stacks",
    tasks: [
      { label: "Review: Stack pattern", href: "/problems" },
      { label: "Solve: Valid Parentheses", href: "/problems/valid-parentheses" },
      { label: "Solve: Reverse Linked List", href: "/problems" },
    ],
  },
  {
    day: "Friday",
    focus: "Behavioral round: STAR framework",
    tasks: [
      { label: "Draft three stories", href: "/behavioral" },
      { label: "Record yourself answering one question out loud" },
      { label: "Read: Amazon Leadership Principles field guide", href: "/blog/amazon-leadership-principles-field-guide" },
    ],
  },
  {
    day: "Saturday",
    focus: "Systems primer",
    tasks: [
      { label: "Read: URL shortener", href: "/system-design" },
      { label: "Sketch your own design on paper before reading" },
      { label: "Read: System design rubric", href: "/blog/system-design-interview-rubric" },
    ],
  },
  {
    day: "Sunday",
    focus: "Review and self-assessment",
    tasks: [
      { label: "Re-attempt one problem from each earlier day without looking at the solution" },
      { label: "Note the two patterns that are still weakest" },
      { label: "Plan next week around those two patterns" },
    ],
  },
];

export default function StudyPlanPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Study Plan</h1>
        <p className="text-slate-400">
          A free seven-day plan to build the core prep habit. Pro subscribers get a personalized weekly plan
          generated from your target companies, progress, and forgetting-curve schedule.
        </p>
      </div>
      <div className="space-y-4">
        {WEEK_ONE.map((d) => (
          <section
            key={d.day}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-6"
          >
            <div className="flex items-baseline gap-3 mb-3">
              <h2 className="text-xl font-semibold">{d.day}</h2>
              <span className="text-sm text-slate-500">{d.focus}</span>
            </div>
            <ul className="space-y-2">
              {d.tasks.map((t) => (
                <li key={t.label} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="text-cyan-300 mt-0.5">+</span>
                  {t.href ? (
                    <Link href={t.href} className="hover:text-cyan-300">
                      {t.label}
                    </Link>
                  ) : (
                    <span>{t.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/60 p-8">
        <h2 className="text-xl font-semibold mb-3">Want a personalized plan?</h2>
        <p className="text-slate-400 mb-5">
          Pro and Elite subscribers get a weekly plan generated from their target companies, current progress, and
          which patterns they have seen most recently. Join the waitlist to unlock it at launch.
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
