"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, intended_tier: "free", referrer: "footer" }),
      });
      const raw = await res.text();
      let parsed: { ok?: boolean; duplicate?: boolean; error?: string } | null = null;
      if (raw && raw.length > 0) {
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = null;
        }
      }
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setErrorMessage(parsed?.error ?? "Could not subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "done") {
    return <p className="text-sm text-cyan-300">Thanks. You are on the list.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="flex gap-2">
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
      </div>
      {status === "error" && errorMessage ? (
        <p className="text-xs text-red-300">{errorMessage}</p>
      ) : null}
    </form>
  );
}
