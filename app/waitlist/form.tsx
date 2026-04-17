"use client";
import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<"free" | "pro" | "elite">("pro");
  const [companies, setCompanies] = useState<string[]>([]);
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const COMPANIES = ["meta", "google", "amazon", "apple", "netflix", "microsoft", "stripe", "openai"];

  const toggleCompany = (c: string) => {
    setCompanies((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          intended_tier: tier,
          target_companies: companies,
          target_role: role,
          experience_years: years ? parseInt(years, 10) : null,
          referrer: "waitlist-page",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-8 text-center">
        <div className="text-2xl font-semibold mb-2">You are on the list.</div>
        <p className="text-slate-300">
          We will email <span className="text-cyan-300">{email}</span> the moment your tier unlocks. In the meantime,
          dive into the public problem library.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Intended tier</label>
        <div className="grid grid-cols-3 gap-3">
          {(["free", "pro", "elite"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              className={`rounded-md border px-4 py-3 text-sm font-medium transition ${
                tier === t
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Target companies</label>
        <div className="flex flex-wrap gap-2">
          {COMPANIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleCompany(c)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                companies.includes(c)
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Target role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full"
            placeholder="Senior SWE"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Years experience</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full"
            min={0}
            max={50}
            placeholder="5"
          />
        </div>
      </div>

      {errorMsg ? (
        <p className="text-sm text-red-400">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-cyan-500 text-slate-950 px-6 py-3 font-semibold hover:bg-cyan-400 transition disabled:opacity-50"
      >
        {status === "loading" ? "Joining..." : "Join the waitlist"}
      </button>
    </form>
  );
}
