import FacebookFeed from "@/components/facebook/FacebookFeed"
import FacebookHeader from "@/components/facebook/FacebookHeader"
import FacebookRightSidebar from "@/components/facebook/FacebookRightSidebar"
import FacebookSidebar from "@/components/facebook/FacebookSidebar"

export default function FacebookClone() {
  return (
    <div className="min-h-screen bg-gray-100">
      <FacebookHeader />
      <div className="flex max-w-7xl mx-auto pt-16">
        {/* Left Sidebar - Hidden on mobile and tablet */}
        <div className="w-80 fixed left-0 top-16 h-full overflow-y-auto hidden xl:block">
          <FacebookSidebar />
        </div>

        {/* Main Feed - Responsive margins */}
        <div className="flex-1 xl:ml-80 xl:mr-80 lg:mr-80 px-2 sm:px-4">
          <FacebookFeed />
        </div>

        {/* Right Sidebar - Hidden on mobile, visible on large screens */}
        <div className="w-80 fixed right-0 top-16 h-full overflow-y-auto hidden lg:block">
          <FacebookRightSidebar />
        </div>
      </div>
    </div>
  )
}
