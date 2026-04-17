"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, intended_tier: "free", referrer: "footer" }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-sm text-cyan-300">Thanks. You are on the list.</p>;
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-cyan-500 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-cyan-400 transition disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Join"}
      </button>
    </form>
  );
}
