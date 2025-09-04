import { Heart, MapPin, MessageCircle, MoreHorizontal, Share, ThumbsUp } from "lucide-react"
import { useState } from "react"

import { Link } from "react-router"

import type { Post as PostType } from "@/lib/fakeData"
import { usePosts } from "@/lib/useApi"

interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  const { toggleLike } = usePosts()
  const [isLiking, setIsLiking] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    
    setIsLiking(true)
    try {
      await toggleLike(post.id)
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLiking(false)
    }
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Link to={`/facebook/profile/${post.user.id}`}>
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full hover:opacity-80 transition-opacity"
            />
          </Link>
          <div>
            <Link to={`/facebook/profile/${post.user.id}`} className="hover:underline">
              <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            </Link>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <span>{post.timestamp}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900">{post.content}</p>
      </div>

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className="mx-4 mb-3">
          {post.media.map((media, index) => (
            <div key={index} className="relative">
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt="Post content"
                  className="w-full rounded-lg cursor-pointer hover:brightness-95 transition-all"
                />
              ) : media.type === "video" ? (
                <div className="relative">
                  <video
                    src={media.url}
                    poster={media.thumbnail}
                    className="w-full rounded-lg"
                    controls
                    preload="metadata"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <ThumbsUp className="w-3 h-3 text-white" />
            </div>
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center -ml-1">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
          <span className="text-gray-500 text-sm ml-2">{post.likes}</span>
        </div>

        <div className="flex space-x-4 text-gray-500 text-sm">
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-gray-100">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-gray-50 transition-colors disabled:opacity-50 ${
            post.isLiked ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""} ${isLiking ? "animate-pulse" : ""}`} />
          <span className="font-medium">{post.isLiked ? "Liked" : "Like"}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-gray-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600 font-medium">Comment</span>
        </button>

        <button className="flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-gray-50 transition-colors">
          <Share className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600 font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img src={post.user.avatar} alt="User" className="w-8 h-8 rounded-full" />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md transition-all"
            />
          </div>
          <div className="text-sm text-gray-500 text-center">
            💡 Comments are loaded from API when you interact with them!
          </div>
        </div>
      )}
    </div>
  )
}
