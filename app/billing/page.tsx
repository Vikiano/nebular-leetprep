import Link from "next/link";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">Billing</h1>
        <p className="text-slate-400">
          You are on the free tier. Paid tiers unlock when the waitlist crosses 50 signups and Stripe checkout is
          activated.
        </p>
      </div>

      <section className="mb-8 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6">
        <div className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Current plan</div>
        <div className="flex items-baseline gap-3 mb-3">
          <h2 className="text-2xl font-bold">Free</h2>
          <span className="text-slate-400">$0 / month</span>
        </div>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex gap-2"><span className="text-cyan-300">+</span> 10 problems per month</li>
          <li className="flex gap-2"><span className="text-cyan-300">+</span> One Intermediate AI explanation per problem per day</li>
          <li className="flex gap-2"><span className="text-cyan-300">+</span> Roadmap, behavioral drills, system design topic library</li>
          <li className="flex gap-2"><span className="text-cyan-300">+</span> Blog and weekly prep drop</li>
        </ul>
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Next up</div>
          <h3 className="text-xl font-bold mb-1">Pro</h3>
          <div className="text-sm text-slate-400 mb-3">$29 / month</div>
          <p className="text-sm text-slate-300 mb-4">
            Unlimited problems, all three AI explanation tiers, one company playbook active at a time, text-mode mock interviews.
          </p>
          <Link
            href="/waitlist?tier=pro"
            className="inline-block rounded-md bg-cyan-500 text-slate-950 px-5 py-2 text-sm font-semibold hover:bg-cyan-400 transition"
          >
            Request Pro
          </Link>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Power user</div>
          <h3 className="text-xl font-bold mb-1">Elite</h3>
          <div className="text-sm text-slate-400 mb-3">$79 / month</div>
          <p className="text-sm text-slate-300 mb-4">
            Everything in Pro plus simultaneous access to every company playbook, weekly personalized study plan, monthly resume review.
          </p>
          <Link
            href="/waitlist?tier=elite"
            className="inline-block rounded-md border border-slate-700 text-slate-200 px-5 py-2 text-sm font-semibold hover:border-cyan-500 transition"
          >
            Request Elite
          </Link>
        </div>
      </section>

      <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
        <h3 className="text-slate-200 font-semibold mb-2">Payment method</h3>
        <p>
          No payment method on file. Stripe checkout activates once the waitlist crosses 50 real signups and we flip
          the launch switch. You will receive an email invite to upgrade at that point.
        </p>
      </div>
    </div>
  );
}
