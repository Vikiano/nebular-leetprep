export const metadata = { title: "Study Plan" };

export default function StudyPlanPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 prose-night">
      <h1>Study Plan</h1>
      <p className="text-slate-400">
        Personalized weekly study plans ship in Phase 2 for Elite subscribers. The plan generator considers your
        target companies, current progress, and forgetting curve across attempted problems.
      </p>
    </div>
  );
}
