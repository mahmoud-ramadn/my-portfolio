import { useEffect } from "react"

import { usePosts, useApiStatus } from "@/lib/useApi"

import CreatePost from "./CreatePost.tsx"
import Post from "./Post.tsx"
import Stories from "./Stories.tsx"

export default function FacebookFeed() {
  const { posts, loading, error, fetchPosts } = usePosts()
  const { isOnline, lastChecked } = useApiStatus()

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-2xl mx-auto">
      {/* API Status Indicator */}
      {!isOnline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          📡 Using offline data - API unavailable
          {lastChecked && (
            <span className="block text-xs mt-1">Last checked: {lastChecked.toLocaleTimeString()}</span>
          )}
        </div>
      )}

      {/* Stories */}
      <Stories />

      {/* Create Post */}
      <CreatePost />

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading posts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">⚠️ Error loading posts</p>
          <p className="text-sm mt-1">{error}</p>
          <button 
            onClick={fetchPosts}
            className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Posts */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
