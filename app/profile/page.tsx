import Link from "next/link";

export const metadata = { title: "Profile" };

type Preference = { label: string; value: string };

const DEFAULT_PREFERENCES: Preference[] = [
  { label: "Active tier", value: "Free" },
  { label: "Target companies", value: "Set via the waitlist form" },
  { label: "Experience level", value: "Set via the waitlist form" },
  { label: "Target role", value: "Set via the waitlist form" },
  { label: "Timezone", value: "Detected from browser at session start" },
];

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">Profile</h1>
        <p className="text-slate-400">
          Full profile editing ships with the authenticated dashboard at Pro launch. In the meantime, your
          preferences follow what you tell the waitlist form, and the free tier features work without a profile.
        </p>
      </div>

      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Current preferences</h2>
        <dl className="divide-y divide-slate-800">
          {DEFAULT_PREFERENCES.map((p) => (
            <div key={p.label} className="flex justify-between py-3 text-sm">
              <dt className="text-slate-500">{p.label}</dt>
              <dd className="text-slate-200 text-right">{p.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">Change your preferences</h2>
        <p className="text-sm text-slate-400 mb-4">
          Re-submit the waitlist form with your updated target companies, experience, or tier selection. We merge on
          the email address.
        </p>
        <Link
          href="/waitlist"
          className="inline-block rounded-md bg-cyan-500 text-slate-950 px-5 py-2 text-sm font-semibold hover:bg-cyan-400 transition"
        >
          Update via waitlist
        </Link>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
        <h3 className="text-slate-200 font-semibold mb-2">Privacy</h3>
        <p>
          We do not sell your data. We use your email for transactional messages only. See our{' '}
          <Link href="/legal/privacy" className="text-cyan-300 hover:text-cyan-200">
            privacy policy
          </Link>{' '}
          or email <a href="mailto:privacy@nebular.art" className="text-cyan-300 hover:text-cyan-200">privacy@nebular.art</a> to request an export or deletion.
        </p>
      </section>
    </div>
  );
}
