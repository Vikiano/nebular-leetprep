import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-xs text-slate-400 mb-8">
        404
      </div>
      <h1 className="text-4xl font-bold mb-4">This page is off the roadmap</h1>
      <p className="text-slate-400 mb-8">
        The URL does not match any of our routes. Try the problem library, the roadmap, or the company paths.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link
          href="/"
          className="rounded-md bg-cyan-500 text-slate-950 px-5 py-2 text-sm font-semibold hover:bg-cyan-400 transition"
        >
          Home
        </Link>
        <Link
          href="/problems"
          className="rounded-md border border-slate-700 text-slate-200 px-5 py-2 text-sm font-semibold hover:border-cyan-500 transition"
        >
          Problems
        </Link>
        <Link
          href="/roadmap"
          className="rounded-md border border-slate-700 text-slate-200 px-5 py-2 text-sm font-semibold hover:border-cyan-500 transition"
        >
          Roadmap
        </Link>
        <Link
          href="/companies"
          className="rounded-md border border-slate-700 text-slate-200 px-5 py-2 text-sm font-semibold hover:border-cyan-500 transition"
        >
          Company paths
        </Link>
      </div>
    </div>
  );
}
