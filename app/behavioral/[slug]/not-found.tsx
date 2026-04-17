import Link from "next/link";

export default function BehavioralNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-xs text-slate-400 mb-8">
        Behavioral question not in library
      </div>
      <h1 className="text-3xl font-bold mb-4">That question is not drilled yet</h1>
      <p className="text-slate-400 mb-8">
        20 behavioral questions seeded across Amazon Leadership Principles, Meta values, Google behavioral, and Apple craft.
        More ship weekly.
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link
          href="/behavioral"
          className="rounded-md bg-cyan-500 text-slate-950 px-5 py-2 text-sm font-semibold hover:bg-cyan-400 transition"
        >
          Browse all drills
        </Link>
        <Link
          href="/companies"
          className="rounded-md border border-slate-700 text-slate-200 px-5 py-2 text-sm font-semibold hover:border-cyan-500 transition"
        >
          Company playbooks
        </Link>
      </div>
    </div>
  );
}
