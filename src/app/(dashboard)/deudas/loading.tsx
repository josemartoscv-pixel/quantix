export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-7 w-32 bg-gray-200 rounded-xl" />
        <div className="h-9 w-32 bg-gray-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="h-4 w-32 bg-gray-200 rounded-full" />
              <div className="h-6 w-20 bg-gray-200 rounded-xl" />
            </div>
            <div className="h-2 bg-gray-100 rounded-full" />
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-gray-100 rounded-full" />
              <div className="h-3 w-20 bg-gray-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
