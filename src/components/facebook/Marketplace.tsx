import { 
  Heart, 
  MapPin, 
  MessageCircle, 
  Star, 
  Search, 
  Filter, 
  Grid, 
  List,
  ChevronDown,
  Plus,
  Car,
  Smartphone,
  Monitor,
  Home,
  Shirt,
  Book,
  Gamepad2,
  Music,
  Camera,
  Baby,
  Dumbbell,
  PawPrint,
  Share,
  Bookmark,
  RefreshCw
} from "lucide-react"
import { useState, useCallback, useMemo } from "react"

import { useProducts, useApiStatus } from "@/lib/useApi"
import { ProductGridSkeleton } from "./MarketplaceSkeleton.tsx"

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [condition, setCondition] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  // API integration
  const filters = useMemo(() => ({
    category: selectedCategory,
    priceRange,
    condition,
    searchQuery: searchQuery.trim(),
    sortBy,
    limit: 20
  }), [selectedCategory, priceRange, condition, searchQuery, sortBy])

  const { products, loading, error, hasMore, fetchProducts, toggleFavorite, loadMore } = useProducts(filters)
  const { isOnline, lastChecked } = useApiStatus()

  const handleFavoriteToggle = useCallback(async (productId: number) => {
    const success = await toggleFavorite(productId)
    if (success) {
      setFavorites(prev => {
        const newFavorites = new Set(prev)
        if (newFavorites.has(productId)) {
          newFavorites.delete(productId)
        } else {
          newFavorites.add(productId)
        }
        return newFavorites
      })
    }
  }, [toggleFavorite])

  const categories = [
    { id: 'all', name: 'All Categories', icon: Grid, color: 'text-blue-600' },
    { id: 'vehicles', name: 'Vehicles', icon: Car, color: 'text-red-600' },
    { id: 'electronics', name: 'Electronics', icon: Smartphone, color: 'text-purple-600' },
    { id: 'computers', name: 'Computers', icon: Monitor, color: 'text-green-600' },
    { id: 'home', name: 'Home & Garden', icon: Home, color: 'text-orange-600' },
    { id: 'fashion', name: 'Clothing & Accessories', icon: Shirt, color: 'text-pink-600' },
    { id: 'books', name: 'Books & Media', icon: Book, color: 'text-indigo-600' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'text-cyan-600' },
    { id: 'music', name: 'Musical Instruments', icon: Music, color: 'text-yellow-600' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'text-teal-600' },
    { id: 'baby', name: 'Baby & Kids', icon: Baby, color: 'text-rose-600' },
    { id: 'sports', name: 'Sports & Fitness', icon: Dumbbell, color: 'text-emerald-600' },
    { id: 'pets', name: 'Pet Supplies', icon: PawPrint, color: 'text-amber-600' },
  ]

  const filteredProducts = products // Products are now filtered by API

  const sortedProducts = filteredProducts // Products are now sorted by API

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* API Status Indicator */}
      {!isOnline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800">
          🛒 Using offline data - Marketplace API unavailable
          {lastChecked && (
            <span className="block text-xs mt-1">Last checked: {lastChecked.toLocaleTimeString()}</span>
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-red-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">⚠️ Error loading products</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
            <button 
              onClick={() => fetchProducts()}
              disabled={loading}
              className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition-colors disabled:opacity-50 flex items-center space-x-1"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-600 mt-1">Browse what's for sale in your area</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create new listing</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Marketplace"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-3 mb-6">
          {categories.slice(0, 13).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <category.icon className={`w-6 h-6 mb-2 ${category.color}`} />
              <span className="text-xs text-center font-medium text-gray-900 leading-tight">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Any price</option>
                <option value="under100">Under $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="over1000">Over $1,000</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Condition Filter */}
            <div className="relative">
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Any condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More filters</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Most recent</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
                <option value="rating">Highest rated</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors rounded-l-lg`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors rounded-r-lg`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          {loading ? (
            <span className="inline-flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading products...</span>
            </span>
          ) : (
            <>
              {sortedProducts.length} result{sortedProducts.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </>
          )}
        </p>
      </div>

      {/* Loading State */}
      {loading && products.length === 0 ? (
        <ProductGridSkeleton viewMode={viewMode} count={8} />
      ) : (
        <>
          {/* Products Grid/List */}
          <div className={`grid gap-6 ${viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
            }`}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group ${viewMode === 'list' ? 'flex' : ''}`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`object-cover group-hover:scale-105 transition-transform duration-200 ${viewMode === 'list' ? 'w-full h-48' : 'w-full h-48'}`}
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFavoriteToggle(product.id)
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${
                      favorites.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'
                    }`} />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.condition === 'new' 
                        ? 'bg-green-100 text-green-800' 
                        : product.condition === 'used'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 text-white px-2 py-1 text-xs rounded">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xl font-bold text-gray-900">
                      {product.currency}{product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{product.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={product.seller.avatar}
                        alt={product.seller.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.seller.name}</p>
                        <p className="text-xs text-gray-500">Usually responds quickly</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Share className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Bookmark className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Load More Skeleton */}
            {loading && products.length > 0 && (
              <>

                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`skeleton-${index}`} className={`bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`bg-gray-200 ${viewMode === 'list' ? 'w-48 flex-shrink-0 h-48' : 'w-full h-48'}`}></div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-3"></div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Load More */}
          {sortedProducts.length > 0 && hasMore && (
            <div className="text-center mt-8">
              <button 
                onClick={loadMore}
                disabled={loading}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2 mx-auto"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Loading more...</span>
                  </>
                ) : (
                  <span>Load more listings</span>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {!loading && sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Search className="w-16 h-16 text-gray-300 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setPriceRange('all')
              setCondition('all')
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}