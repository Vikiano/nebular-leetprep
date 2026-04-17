import WaitlistForm from "./form";

export const metadata = {
  title: "Join the Waitlist",
  description: "Be the first to access LeetPrep Studio Pro and Elite tiers.",
};

export default function WaitlistPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the waitlist</h1>
        <p className="text-slate-400 text-lg">
          Free-tier access is open now. Pro and Elite tiers unlock when the waitlist crosses 50 real signups.
          Tell us which tier you want and what you are preparing for, and we will email you the moment it is live.
        </p>
      </div>
      <WaitlistForm />
      <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
        <p className="mb-2"><strong className="text-slate-200">What you get today.</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Immediate access to the public problem library (100 problems seeded, expanding weekly).</li>
          <li>Roadmap, behavioral drills, system design topic library.</li>
          <li>One AI explanation per problem per day at the Intermediate tier.</li>
        </ul>
        <p className="mt-4 mb-2"><strong className="text-slate-200">What unlocks at Pro and Elite.</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Unlimited AI explanations at all three tiers (ELI5, Intermediate, Expert).</li>
          <li>Spaced repetition, company-specific playbooks, mock interview sessions.</li>
          <li>Elite: voice-mode AI interviewer (Phase 2), resume review, weekly personalized study plan.</li>
        </ul>
      </div>
    </div>
  );
}
