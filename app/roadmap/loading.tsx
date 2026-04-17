export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="h-10 w-48 bg-slate-800 rounded animate-pulse mb-3" />
        <div className="h-4 w-96 bg-slate-800 rounded animate-pulse" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-5"
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-slate-800 rounded animate-pulse" />
              <div className="h-3 w-1/4 bg-slate-800 rounded animate-pulse" />
            </div>
            <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
