import FacebookHeader from "../components/facebook/FacebookHeader.tsx"
import MarketplacePage from "../components/facebook/MarketplacePage.tsx"

export default function FacebookMarketplaceDemo() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <FacebookHeader />
      
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <button className="text-blue-600 hover:text-blue-700">
              Facebook
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Marketplace</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <MarketplacePage />
    </div>
  )
}