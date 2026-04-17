export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
      </div>
      <div className="grid md:grid-cols-5 gap-8">
        <section className="md:col-span-3 space-y-4">
          <div className="h-8 w-2/3 bg-slate-800 rounded animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-16 bg-slate-800 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="space-y-2 mt-6">
            <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-800 rounded animate-pulse" />
          </div>
        </section>
        <aside className="md:col-span-2">
          <div className="sticky top-24 rounded-lg border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-8 bg-slate-800 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-10 w-full bg-slate-800 rounded animate-pulse" />
          </div>
        </aside>
      </div>
    </div>
  );
}
