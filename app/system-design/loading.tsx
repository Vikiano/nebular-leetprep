export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="h-10 w-64 bg-slate-800 rounded animate-pulse mb-3" />
        <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="h-5 w-2/3 bg-slate-800 rounded animate-pulse" />
              <div className="h-5 w-16 bg-slate-800 rounded-full animate-pulse" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 w-16 bg-slate-800 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
