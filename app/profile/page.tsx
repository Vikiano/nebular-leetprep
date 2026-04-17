import Link from "next/link";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-3">Profile</h1>
      <p className="text-slate-400 mb-8">
        Profile editing ships in Phase 2. For now, update your preferences via the waitlist form.
      </p>
      <Link href="/waitlist" className="inline-block rounded-md border border-slate-700 px-6 py-3 hover:border-cyan-500">
        Update preferences
      </Link>
    </div>
  );
}
