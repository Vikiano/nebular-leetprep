export const metadata = {
  title: "Coach Mode",
  description: "Transparent desktop companion for self-directed practice. Refuses to activate during live interviews.",
};

export default function CoachModePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose-night">
      <h1>Coach Mode</h1>
      <p className="text-slate-400">
        A desktop companion for self-directed practice. Shipping in Phase 2.
      </p>

      <h2>What it does</h2>
      <ul>
        <li>Pins a problem prompt and a running AI tutor chat on a secondary monitor while you practice on your main screen.</li>
        <li>Tracks session time so you can re-watch your own practice sessions with AI annotations.</li>
        <li>Captures keystroke-level progress to feed the spaced repetition scheduler.</li>
      </ul>

      <h2>What it does not do</h2>
      <ul>
        <li>It does not hide from screen-share. Screen-captures include Coach Mode by design.</li>
        <li>It refuses to activate when any live-interview platform has window focus. Denylist includes HackerRank interview mode, CoderPad, CodeSignal, Amazon Chime, Google Meet, Meta CoderPad.</li>
        <li>It does not route candidate-visible answers during live employer assessments.</li>
      </ul>

      <h2>Why this design</h2>
      <p>
        The interview-cheating tool category is under active litigation (Amazon v. Cluely, September 2025) and
        violates the usage policies of every AI provider in the market. LeetPrep Studio does not serve that segment.
        Coach Mode is built for the legitimate candidate who values career integrity and practices intensely before
        interview day.
      </p>

      <h2>Shipping</h2>
      <p>Phase 2. Target: Week 5 of the 90-day plan (week of 2026-05-14).</p>
    </div>
  );
}
