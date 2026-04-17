import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-slate-800 bg-[#0b0f1a]/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-100 font-semibold text-lg">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" aria-hidden />
          LeetPrep Studio
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/problems" className="hover:text-cyan-300">Problems</Link>
          <Link href="/roadmap" className="hover:text-cyan-300">Roadmap</Link>
          <Link href="/behavioral" className="hover:text-cyan-300">Behavioral</Link>
          <Link href="/system-design" className="hover:text-cyan-300">System Design</Link>
          <Link href="/pricing" className="hover:text-cyan-300">Pricing</Link>
          <Link
            href="/waitlist"
            className="rounded-md bg-cyan-500 text-slate-950 px-4 py-2 font-medium hover:bg-cyan-400 transition"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
