export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Account cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-barclays-blue rounded-xl p-6 space-y-4">
          <Skeleton className="h-4 w-32 bg-blue-400/30" />
          <Skeleton className="h-3 w-48 bg-blue-400/20" />
          <Skeleton className="h-10 w-40 bg-blue-400/30 mt-4" />
          <Skeleton className="h-3 w-36 bg-blue-400/20" />
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-32 mt-2" />
        </div>
      </div>
      {/* Quick actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <Skeleton className="h-5 w-28 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
      {/* Transactions */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <Skeleton className="h-5 w-36 mb-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>
            <Skeleton className="h-3.5 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
