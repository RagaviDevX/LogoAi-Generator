export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-56 shimmer rounded-xl" />
          <div className="h-4 w-80 shimmer rounded-lg" />
        </div>
        <div className="h-10 w-36 shimmer rounded-xl" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-2xl p-5 space-y-3">
            <div className="h-5 w-5 shimmer rounded-lg" />
            <div className="h-9 w-16 shimmer rounded-lg" />
            <div className="h-3 w-24 shimmer rounded-md" />
          </div>
        ))}
      </div>

      {/* Credits bar */}
      <div className="glass rounded-2xl p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-32 shimmer rounded-md" />
          <div className="h-4 w-20 shimmer rounded-md" />
        </div>
        <div className="h-2 shimmer rounded-full" />
        <div className="h-3 w-48 shimmer rounded-md" />
      </div>

      {/* Recent generations */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="h-5 w-40 shimmer rounded-lg" />
          <div className="h-4 w-16 shimmer rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <div className="h-20 shimmer" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-24 shimmer rounded-md" />
                <div className="h-3 w-16 shimmer rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
