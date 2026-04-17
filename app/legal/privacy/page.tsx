export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose-night">
      <h1>Privacy Policy</h1>
      <p className="text-slate-400">Last updated 2026-04-16. Operator: Nebular Labs.</p>

      <h2>Data we collect</h2>
      <ul>
        <li>Account email (for authentication and transactional email).</li>
        <li>Profile preferences (target companies, target role, experience level) if you provide them.</li>
        <li>Progress data (problems attempted, submissions, AI conversation transcripts).</li>
        <li>Privacy-first analytics via Cloudflare Web Analytics (no cookies, no personal data).</li>
      </ul>

      <h2>How we use data</h2>
      <ul>
        <li>Deliver the Service to you.</li>
        <li>Personalize explanations and study plans.</li>
        <li>Send transactional email (signup confirmation, password reset).</li>
        <li>Diagnose errors and improve the Service.</li>
      </ul>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not sell your data.</li>
        <li>We do not share your data with advertisers.</li>
        <li>We do not track you across the web.</li>
      </ul>

      <h2>Third parties</h2>
      <p>We use the following subprocessors:</p>
      <ul>
        <li>Supabase (database, auth, storage).</li>
        <li>Vercel (hosting).</li>
        <li>Cloudflare (DNS, analytics, SSL).</li>
        <li>Anthropic and OpenAI (AI inference, content is not used to train their models under API terms).</li>
        <li>Resend (transactional email).</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can export your data or request deletion by emailing <a href="mailto:privacy@nebular.art">privacy@nebular.art</a>.
        We respond within 30 days.
      </p>
    </div>
  );
}
