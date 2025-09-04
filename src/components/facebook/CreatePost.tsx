import { Image, MapPin, Smile } from "lucide-react"
import { useState } from "react"

import { fakeUsers } from "@/lib/fakeData"
import { usePosts } from "@/lib/useApi"

export default function CreatePost() {
  const currentUser = fakeUsers[0] // John Doe as current user
  const { createPost } = usePosts()
  const [isCreating, setIsCreating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [postContent, setPostContent] = useState('')

  const handleCreatePost = async () => {
    if (!postContent.trim()) return
    
    setIsCreating(true)
    try {
      const success = await createPost(postContent)
      if (success) {
        setPostContent('')
        setShowModal(false)
      } else {
        alert('Failed to create post. Please try again.')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {/* Top Section */}
        <div className="flex items-center space-x-3 mb-4">
          <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full" />
          <input
            type="text"
            placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md transition-all cursor-pointer"
            onClick={() => setShowModal(true)}
            readOnly
          />
        </div>

        <hr className="border-gray-200 mb-4" />

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center"
          >
            <Image className="w-6 h-6 text-green-500" />
            <span className="text-gray-600 font-medium">Photo/video</span>
          </button>

          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center"
          >
            <Smile className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-600 font-medium">Feeling/activity</span>
          </button>

          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center"
          >
            <MapPin className="w-6 h-6 text-red-500" />
            <span className="text-gray-600 font-medium">Check in</span>
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => !isCreating && setShowModal(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Create Post</h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-sm text-gray-500">Public</p>
                </div>
              </div>

              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isCreating}
              />

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isCreating}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!postContent.trim() || isCreating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isCreating && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  <span>{isCreating ? 'Posting...' : 'Post'}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
