export default function GenerateLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-56 shimmer rounded-xl" />
        <div className="h-4 w-80 shimmer rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input panel skeleton */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass rounded-2xl p-5 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 shimmer rounded" />
                <div className="h-11 shimmer rounded-xl" />
              </div>
            ))}
            <div className="h-12 shimmer rounded-xl" />
          </div>
        </div>

        {/* Result panel skeleton */}
        <div className="lg:col-span-3 glass rounded-2xl p-5 space-y-4">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-20 shimmer rounded-xl" />
            ))}
          </div>
          <div className="space-y-3 pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 shimmer rounded-lg" style={{ width: `${70 + i * 5}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
