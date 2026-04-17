import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "LeetPrep Studio pricing. Free tier, Pro at $29/mo, Elite at $79/mo. Join the waitlist for paid tiers.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    blurb: "Get a feel for the platform. Generous free tier, no credit card.",
    features: [
      "10 problems per month",
      "One Intermediate AI explanation per problem per day",
      "Roadmap preview",
      "Community discussion",
    ],
    cta: "Start Free",
    ctaHref: "/waitlist",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    blurb: "The serious-prep subscription. Everything you need for an active interview cycle.",
    features: [
      "Unlimited problems",
      "All three AI explanation tiers (ELI5, Intermediate, Expert)",
      "Spaced repetition scheduler",
      "One company playbook active at a time",
      "Full behavioral drill bank",
      "System design topic library",
      "Text-mode mock interviews",
    ],
    cta: "Join Waitlist",
    ctaHref: "/waitlist?tier=pro",
    highlighted: true,
  },
  {
    name: "Elite",
    price: "$79",
    period: "/ month",
    blurb: "For candidates in an aggressive cycle targeting multiple top-tier offers.",
    features: [
      "Everything in Pro",
      "Simultaneous access to all company playbooks",
      "Voice-mode AI interviewer (Phase 2)",
      "Resume review (one per month)",
      "Weekly personalized study plan",
      "Priority inference on best model",
    ],
    cta: "Join Waitlist",
    ctaHref: "/waitlist?tier=elite",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Free tier open today. Pro and Elite unlock when the waitlist crosses 50 real signups. Founding-member pricing
          locked in for the first 200 Pro and first 50 Elite signups.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-xl border p-8 flex flex-col ${
              t.highlighted
                ? "border-cyan-500 bg-cyan-500/5 shadow-lg shadow-cyan-500/10"
                : "border-slate-800 bg-slate-900/40"
            }`}
          >
            {t.highlighted ? (
              <div className="mb-4 text-xs uppercase tracking-wider font-semibold text-cyan-300">
                Recommended
              </div>
            ) : null}
            <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">{t.price}</span>
              <span className="text-slate-400">{t.period}</span>
            </div>
            <p className="text-sm text-slate-400 mb-6">{t.blurb}</p>
            <ul className="space-y-3 mb-8 text-sm flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-cyan-300 mt-0.5">+</span>
                  <span className="text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={t.ctaHref}
              className={`block text-center rounded-md px-6 py-3 font-semibold transition ${
                t.highlighted
                  ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  : "border border-slate-700 text-slate-200 hover:border-cyan-500"
              }`}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center text-sm text-slate-500">
        All pricing in USD. Annual billing saves 28 percent: Pro at $249/year, Elite at $699/year.
      </div>
    </div>
  );
}
