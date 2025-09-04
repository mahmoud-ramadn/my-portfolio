import FacebookSidebar from "./FacebookSidebar.tsx"
import Marketplace from "./Marketplace.tsx"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <FacebookSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Marketplace />
          </div>
        </div>
      </div>
    </div>
  )
}