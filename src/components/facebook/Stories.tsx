import { Plus } from "lucide-react"

import { fakeStories } from "@/lib/fakeData"

export default function Stories() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
      <div className="flex space-x-2 sm:space-x-3 overflow-x-auto scrollbar-hide">
        {/* Add Story Card */}
        <div className="flex-shrink-0 cursor-pointer">
          <div className="relative w-20 h-32 sm:w-24 sm:h-36 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 text-center px-1">Create Story</span>
            </div>
          </div>
        </div>

        {/* Stories */}
        {fakeStories.map((story) => (
          <div key={story.id} className="flex-shrink-0 cursor-pointer">
            <div className="relative w-20 h-32 sm:w-24 sm:h-36 rounded-lg overflow-hidden">
              <img src={story.media} alt={story.user.name} className="w-full h-full object-cover" />
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${story.isViewed ? "border-gray-300" : "border-blue-600"}`}
                />
              </div>
              <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2">
                <p className="text-white text-xs font-medium leading-tight">{story.user.name}</p>
              </div>
              {!story.isViewed && <div className="absolute inset-0 bg-blue-600/10 rounded-lg" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
