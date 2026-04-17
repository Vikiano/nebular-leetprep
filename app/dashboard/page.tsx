import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-slate-400 mb-8">
          Sign in to track your progress, see due-for-review problems, and follow your company playbook.
        </p>
        <Link
          href="/waitlist"
          className="inline-block rounded-md bg-cyan-500 text-slate-950 px-6 py-3 font-semibold hover:bg-cyan-400 transition"
        >
          Join Waitlist
        </Link>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-3">Welcome back, {profile?.display_name ?? user.email}</h1>
      <p className="text-slate-400 mb-10">Free tier active. Keep preparing.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/problems"
          className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/40 transition"
        >
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Continue</div>
          <div className="font-semibold text-lg">Browse Problems</div>
        </Link>
        <Link
          href="/roadmap"
          className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/40 transition"
        >
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Plan</div>
          <div className="font-semibold text-lg">Roadmap</div>
        </Link>
        <Link
          href="/companies"
          className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/40 transition"
        >
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">Playbook</div>
          <div className="font-semibold text-lg">Company Paths</div>
        </Link>
      </div>
    </div>
  );
}
