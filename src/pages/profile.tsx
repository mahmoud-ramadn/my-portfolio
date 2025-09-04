import { Calendar, Camera, Globe, Heart, MapPin, MessageCircle, MoreHorizontal, UserPlus } from "lucide-react"

import { Link, useParams } from "react-router"

import { fakePosts, fakeUsers } from "@/lib/fakeData"

import FacebookHeader from "../components/facebook/FacebookHeader"
import Post from "../components/facebook/Post"

export default function ProfilePage() {
  const { userId } = useParams()
  const user = fakeUsers.find((u) => u.id === parseInt(userId || "1"))
  const userPosts = fakePosts.filter((post) => post.user.id === parseInt(userId || "1"))

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <FacebookHeader />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
            <Link to="/facebook" className="text-blue-600 hover:underline">
              Go back to Feed
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isCurrentUser = user.id === 1 // John Doe is current user

  return (
    <div className="min-h-screen bg-gray-100">
      <FacebookHeader />

      <div className="pt-16 max-w-6xl mx-auto">
        {/* Cover Photo and Profile */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          {/* Cover Photo */}
          <div className="relative h-80 rounded-t-lg overflow-hidden">
            <img src={user.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
            {isCurrentUser && (
              <button className="absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-50">
                <Camera className="w-4 h-4" />
                <span className="text-sm font-medium">Edit cover photo</span>
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Profile Picture */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white bg-white"
                />
                {isCurrentUser && (
                  <button className="absolute bottom-2 right-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Name and Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-2">{user.bio}</p>
                <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{user.website}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex space-x-6 text-sm text-gray-600 mb-4">
                  <span>
                    <strong>{user.friends.toLocaleString()}</strong> friends
                  </span>
                  <span>
                    <strong>{user.followers.toLocaleString()}</strong> followers
                  </span>
                  <span>
                    <strong>{user.following.toLocaleString()}</strong> following
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {isCurrentUser ? (
                  <>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                      <span>Add to story</span>
                    </button>
                    <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center space-x-2">
                      <span>Edit profile</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Add friend</span>
                    </button>
                    <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <button className="bg-gray-200 text-gray-900 p-2 rounded-lg hover:bg-gray-300">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Lives in {user.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <a href={`https://${user.website}`} className="text-blue-600 hover:underline">
                    {user.website}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{user.followers.toLocaleString()} followers</span>
                </div>
              </div>
            </div>

            {/* Friends Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Friends</h2>
                <Link to="#" className="text-blue-600 hover:underline text-sm">
                  See all friends
                </Link>
              </div>
              <p className="text-gray-500 text-sm mb-4">{user.friends.toLocaleString()} friends</p>
              <div className="grid grid-cols-3 gap-2">
                {fakeUsers.slice(1, 7).map((friend) => (
                  <Link key={friend.id} to={`/facebook/profile/${friend.id}`} className="group">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-full aspect-square object-cover rounded-lg group-hover:opacity-80"
                    />
                    <p className="text-xs font-medium mt-1 truncate">{friend.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Posts */}
          <div className="lg:col-span-2 space-y-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => <Post key={post.id} post={post} />)
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">
                  {isCurrentUser ? "Share your first post!" : `${user.name} hasn't shared any posts yet.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
