import Link from "next/link";
import NewsletterForm from "./newsletter-form";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#05070d] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="text-slate-100 font-semibold mb-3">LeetPrep Studio</div>
          <p className="text-slate-400">
            The interview prep platform for candidates who value career integrity. Operated by Nebular Labs.
          </p>
        </div>
        <div>
          <div className="text-slate-100 font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/problems">Problems</Link></li>
            <li><Link href="/roadmap">Roadmap</Link></li>
            <li><Link href="/behavioral">Behavioral</Link></li>
            <li><Link href="/system-design">System Design</Link></li>
            <li><Link href="/coach-mode">Coach Mode</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-slate-100 font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/acceptable-use">Acceptable Use</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-slate-100 font-semibold mb-3">Newsletter</div>
          <p className="text-slate-400 mb-3">
            Weekly prep drops. No spam. Unsubscribe anytime.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        Nebular Labs. All rights reserved.
      </div>
    </footer>
  );
}
