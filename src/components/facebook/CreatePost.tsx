import { Image, MapPin, Smile } from "lucide-react"

import { fakeUsers } from "@/lib/fakeData"

export default function CreatePost() {
  const currentUser = fakeUsers[0] // John Doe as current user

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Top Section */}
      <div className="flex items-center space-x-3 mb-4">
        <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md transition-all cursor-pointer"
          readOnly
        />
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
          <Image className="w-6 h-6 text-green-500" />
          <span className="text-gray-600 font-medium">Photo/video</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
          <Smile className="w-6 h-6 text-yellow-500" />
          <span className="text-gray-600 font-medium">Feeling/activity</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
          <MapPin className="w-6 h-6 text-red-500" />
          <span className="text-gray-600 font-medium">Check in</span>
        </button>
      </div>
    </div>
  )
}
