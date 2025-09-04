export interface ProductSkeletonProps {
  viewMode?: 'grid' | 'list'
  count?: number
}

export function ProductCardSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse ${
        viewMode === 'list' ? 'flex' : ''
      }`}
    >
      {/* Image Skeleton */}
      <div className={`bg-gray-200 ${viewMode === 'list' ? 'w-48 flex-shrink-0 h-48' : 'w-full h-48'}`}>
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        {/* Price and Rating */}
        <div className="flex items-start justify-between mb-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-6"></div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Seller and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-2 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ viewMode = 'grid', count = 8 }: ProductSkeletonProps) {
  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} viewMode={viewMode} />
      ))}
    </div>
  )
}

export function MarketplaceSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-60"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="h-12 bg-gray-200 rounded-lg mb-6"></div>

        {/* Categories Skeleton */}
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-3 mb-6">
          {Array.from({ length: 13 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center p-3 border-2 border-gray-200 rounded-lg">
              <div className="w-6 h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
          </div>
        </div>
      </div>

      {/* Results Count Skeleton */}
      <div className="mb-4">
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      {/* Products Grid Skeleton */}
      <ProductGridSkeleton count={8} />
    </div>
  )
}