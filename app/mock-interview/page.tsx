export const metadata = { title: "Mock Interview" };

export default function MockInterviewPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 prose-night">
      <h1>Mock Interview</h1>
      <p className="text-slate-400">
        Text-mode mock coding and behavioral interviews ship for Pro subscribers. Voice mode (Deepgram plus
        ElevenLabs) unlocks for Elite in Phase 2.
      </p>
      <p className="text-slate-400">
        By design, mock sessions are logged with a tamper-evident receipt you can export for your own records. We
        are not for use during live employer assessments.
      </p>
    </div>
  );
}
