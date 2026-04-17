export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="h-10 w-64 bg-slate-800 rounded animate-pulse mb-3" />
        <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
      </div>
      {[1, 2, 3].map((section) => (
        <section key={section} className="mb-10">
          <div className="h-5 w-48 bg-slate-800 rounded animate-pulse mb-4" />
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-800 bg-slate-900/40 p-5 space-y-2"
              >
                <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
