export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="h-10 w-48 bg-slate-800 rounded animate-pulse mb-3" />
        <div className="h-4 w-80 bg-slate-800 rounded animate-pulse" />
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-6">
          <div>
            <div className="h-3 w-24 bg-slate-800 rounded animate-pulse mb-2" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-16 bg-slate-800 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </aside>
        <section className="md:col-span-3 space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-800 bg-slate-900/30"
            >
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-1/3 bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="h-6 w-16 bg-slate-800 rounded-full animate-pulse" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
