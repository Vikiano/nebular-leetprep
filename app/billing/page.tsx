import Link from "next/link";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 prose-night">
      <h1>Billing</h1>
      <p className="text-slate-400">
        You are on the free tier. Paid tiers (Pro and Elite) unlock when the LeetPrep Studio waitlist crosses 50
        signups and Stripe checkout is activated.
      </p>
      <Link
        href="/pricing"
        className="inline-block rounded-md bg-cyan-500 text-slate-950 px-6 py-3 font-semibold hover:bg-cyan-400 transition mt-4"
      >
        View pricing
      </Link>
    </div>
  );
}
