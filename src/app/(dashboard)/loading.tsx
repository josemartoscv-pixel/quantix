export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-7 w-48 bg-gray-200 rounded-xl" />
        <div className="h-9 w-32 bg-gray-200 rounded-xl" />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 space-y-3 border border-gray-100">
            <div className="h-3 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-28 bg-gray-200 rounded-full" />
            <div className="h-3 w-16 bg-gray-100 rounded-full" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
        <div className="h-4 w-32 bg-gray-200 rounded-full" />
        <div className="h-52 bg-gray-100 rounded-xl" />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3">
            <div className="h-4 w-28 bg-gray-200 rounded-full" />
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-24 bg-gray-200 rounded-full" />
                  <div className="h-2.5 w-16 bg-gray-100 rounded-full" />
                </div>
                <div className="h-3 w-14 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
