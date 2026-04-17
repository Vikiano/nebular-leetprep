export const metadata = {
  title: "Acceptable Use Policy",
  description: "LeetPrep Studio is for self-directed interview preparation only. Not for use during live assessments.",
};

export default function AcceptableUsePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose-night">
      <h1>Acceptable Use Policy</h1>
      <p className="text-slate-400">Last updated 2026-04-16. Operator: Nebular Labs.</p>

      <h2>Purpose</h2>
      <p>
        LeetPrep Studio is a preparation platform for self-directed interview practice. The service and every feature
        (problem library, AI explanations, Coach Mode desktop companion, mock interview sessions, behavioral drills,
        system design topic library) is designed and permitted for use in self-study, not during a live employer
        assessment.
      </p>

      <h2>What you agree not to do</h2>
      <ul>
        <li>
          Use the service during a live interview or assessment with any current or prospective employer without
          explicit written authorization from that employer.
        </li>
        <li>
          Submit AI-generated content from LeetPrep Studio as original work in an employer-proctored assessment.
        </li>
        <li>
          Bypass or attempt to bypass the Coach Mode live-interview denylist. The denylist covers platforms including
          but not limited to HackerRank interview mode, CoderPad, CodeSignal, Amazon Chime with candidate context,
          Google Meet with candidate context, and Meta CoderPad.
        </li>
        <li>
          Scrape, mirror, or republish the problem library, company playbooks, or behavioral and system design
          content without written permission.
        </li>
      </ul>

      <h2>Why this matters</h2>
      <p>
        We are part of an asha-aligned product philosophy: every feature on LeetPrep Studio must produce truth,
        order, and light. We explicitly reject the stealth-cheat race. The legitimate interview-prep market is larger,
        healthier, and compatible with every major AI provider, payment processor, and employer-terms-of-service
        regime. We are the prep tool for candidates who value career integrity and a multi-year career trajectory.
      </p>
      <p>
        Using this platform during a live interview exposes you to offer rescission, academic dishonesty sanctions,
        and potential civil claims by your prospective employer. It also violates the usage policies of the AI
        providers we route through (Anthropic and OpenAI both explicitly prohibit use of their APIs for fraud,
        deception, and academic dishonesty).
      </p>

      <h2>Enforcement</h2>
      <p>
        Users found in breach of this Acceptable Use Policy forfeit their account and any refund rights under our
        Terms of Service. Accounts associated with deceptive use are banned from the platform.
      </p>

      <h2>Reporting</h2>
      <p>
        Suspected violations may be reported to <a href="mailto:compliance@nebular.art">compliance@nebular.art</a>.
        Takedown notices for copyright concerns are honored within 48 hours.
      </p>
    </div>
  );
}
