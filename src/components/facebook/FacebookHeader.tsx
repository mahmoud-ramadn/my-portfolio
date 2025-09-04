import { 
  Bell, 
  Home, 
  Menu, 
  MessageCircle, 
  Play, 
  Search, 
  Store, 
  Users, 
  X, 
  ShoppingBag,
  Heart,
  Package 
} from "lucide-react"

import { useState } from "react"
import { Link, useLocation } from "react-router"

import { type Post, type User, searchPosts, searchUsers } from "@/lib/fakeData"

export default function FacebookHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<{ users: User[]; posts: Post[] }>({ users: [], posts: [] })
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const location = useLocation()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const users = searchUsers(query)
      const posts = searchPosts(query)
      setSearchResults({ users, posts })
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
    setSearchResults({ users: [], posts: [] })
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Section - Logo and Search */}
          <div className="flex items-center space-x-4 flex-1">
            <Link to="/facebook" className="text-blue-600 font-bold text-2xl hover:text-blue-700">
              facebook
            </Link>

            <div className="relative max-w-md flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Facebook"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                className="bg-gray-100 rounded-full pl-10 pr-10 py-2 w-full focus:outline-none focus:bg-white focus:shadow-md transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div className="hidden md:flex items-center space-x-2 flex-1 justify-center">
            <Link 
              to="/facebook" 
              className={`p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                location.pathname === '/facebook' 
                  ? 'text-blue-600 border-b-4 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Home className="w-6 h-6" />
            </Link>
            <button className="p-3 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
              <Users className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
              <Play className="w-6 h-6" />
            </button>
            <Link 
              to="/facebook/marketplace" 
              className={`p-3 rounded-lg hover:bg-gray-100 transition-colors relative ${
                location.pathname === '/facebook/marketplace' 
                  ? 'text-blue-600 border-b-4 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Store className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </Link>
            <button className="p-3 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Right Section - User Actions */}
          <div className="hidden md:flex items-center space-x-2 flex-1 justify-end">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">7</span>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Package className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <Link
              to="/facebook/profile/1"
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-1"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setShowMobileMenu(false)} />
          <div className="fixed top-16 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
            <div className="p-4">
              {/* Mobile Navigation */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <Link 
                  to="/facebook" 
                  className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                    location.pathname === '/facebook' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Home className="w-6 h-6 mb-1" />
                  <span className="text-xs">Home</span>
                </Link>
                <button className="flex flex-col items-center p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  <Users className="w-6 h-6 mb-1" />
                  <span className="text-xs">Friends</span>
                </button>
                <button className="flex flex-col items-center p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  <Play className="w-6 h-6 mb-1" />
                  <span className="text-xs">Watch</span>
                </button>
                <Link 
                  to="/facebook/marketplace" 
                  className={`flex flex-col items-center p-3 rounded-lg transition-colors relative ${
                    location.pathname === '/facebook/marketplace' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Store className="w-6 h-6 mb-1" />
                  <span className="text-xs">Marketplace</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </Link>
                <button className="flex flex-col items-center p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  <ShoppingBag className="w-6 h-6 mb-1" />
                  <span className="text-xs">Shop</span>
                </button>
              </div>

              {/* Mobile User Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Link
                  to="/facebook/profile/1"
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 flex-1"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium text-gray-900">Your Profile</span>
                </Link>
                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative">
                    <MessageCircle className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search Results Dropdown */}
      {showSearchResults && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowSearchResults(false)} />
          <div className="fixed top-16 left-4 right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:right-auto sm:w-96 z-50 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
            {searchResults.users.length === 0 && searchResults.posts.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">No results found for "{searchQuery}"</div>
            ) : (
              <>
                {searchResults.users.length > 0 && (
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-700 px-2 py-1">People</h3>
                    {searchResults.users.map((user) => (
                      <Link
                        key={user.id}
                        to={`/facebook/profile/${user.id}`}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                        onClick={() => setShowSearchResults(false)}
                      >
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {searchResults.posts.length > 0 && (
                  <div className="p-2 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 px-2 py-1">Posts</h3>
                    {searchResults.posts.slice(0, 3).map((post) => (
                      <div
                        key={post.id}
                        className="flex items-start space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                        onClick={() => setShowSearchResults(false)}
                      >
                        <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{post.user.name}</p>
                          <p className="text-xs text-gray-600 line-clamp-2">{post.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
