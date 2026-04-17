"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Client-side error log. Replace with analytics forwarder later.
    // eslint-disable-next-line no-console
    console.error("LeetPrep client error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/5 px-4 py-1.5 text-xs text-red-300 mb-8">
        Something broke on our side
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">We hit a bump</h1>
      <p className="text-slate-400 mb-8">
        The page ran into an error. This has been logged. While we look into it, try reloading or head back to the
        problem library.
      </p>
      {error?.digest ? (
        <p className="text-xs text-slate-500 mb-8">Error ref: {error.digest}</p>
      ) : null}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-cyan-500 text-slate-950 px-6 py-3 font-semibold hover:bg-cyan-400 transition"
        >
          Try again
        </button>
        <Link
          href="/problems"
          className="rounded-md border border-slate-700 text-slate-200 px-6 py-3 font-semibold hover:border-cyan-500 transition"
        >
          Browse problems
        </Link>
      </div>
    </div>
  );
}
