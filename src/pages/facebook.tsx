import FacebookFeed from "@/components/facebook/FacebookFeed"
import FacebookHeader from "@/components/facebook/FacebookHeader"
import FacebookRightSidebar from "@/components/facebook/FacebookRightSidebar"
import FacebookSidebar from "@/components/facebook/FacebookSidebar"

export default function FacebookClone() {
  return (
    <div className="min-h-screen bg-gray-100">
      <FacebookHeader />
      <div className="flex max-w-7xl mx-auto pt-16">
        {/* Left Sidebar */}
        <div className="w-80 fixed left-0 top-16 h-full overflow-y-auto hidden lg:block">
          <FacebookSidebar />
        </div>

        {/* Main Feed */}
        <div className="flex-1 lg:ml-80 lg:mr-80 px-4">
          <FacebookFeed />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 fixed right-0 top-16 h-full overflow-y-auto hidden lg:block">
          <FacebookRightSidebar />
        </div>
      </div>
    </div>
  )
}
