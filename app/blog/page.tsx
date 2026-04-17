export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose-night">
      <h1>Blog</h1>
      <p className="text-slate-400">
        Long-form interview prep essays ship weekly starting week 3 of the 90-day plan. Topics: company playbooks,
        AI-assisted study methodology, behavioral deep dives, system design primers.
      </p>
    </div>
  );
}
