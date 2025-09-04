import { 
  Bookmark, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Flag, 
  MessageCircle, 
  Play, 
  Store, 
  Users, 
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  Package,
  Heart,
  Star,
  MapPin,
  Camera,
  Gamepad2,
  Music,
  Car
} from "lucide-react"

import { fakeUsers } from "@/lib/fakeData"

export default function FacebookSidebar() {
  const currentUser = fakeUsers[0] // John Doe as current user

  const menuItems = [
    { icon: Users, label: "Friends", count: currentUser.friends, color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: Store, label: "Marketplace", count: null, color: "text-green-600", bgColor: "bg-green-100" },
    { icon: ShoppingBag, label: "Shop", count: null, color: "text-purple-600", bgColor: "bg-purple-100" },
    { icon: ShoppingCart, label: "Your Cart", count: 3, color: "text-orange-600", bgColor: "bg-orange-100" },
    { icon: DollarSign, label: "Selling", count: 5, color: "text-emerald-600", bgColor: "bg-emerald-100" },
    { icon: Package, label: "Orders", count: 2, color: "text-indigo-600", bgColor: "bg-indigo-100" },
    { icon: Heart, label: "Wishlist", count: 12, color: "text-red-600", bgColor: "bg-red-100" },
    { icon: Calendar, label: "Events", count: null, color: "text-cyan-600", bgColor: "bg-cyan-100" },
    { icon: Clock, label: "Memories", count: null, color: "text-amber-600", bgColor: "bg-amber-100" },
    { icon: Bookmark, label: "Saved", count: null, color: "text-teal-600", bgColor: "bg-teal-100" },
    { icon: Flag, label: "Pages", count: null, color: "text-pink-600", bgColor: "bg-pink-100" },
    { icon: MessageCircle, label: "Messenger", count: null, color: "text-violet-600", bgColor: "bg-violet-100" },
    { icon: Play, label: "Video", count: null, color: "text-rose-600", bgColor: "bg-rose-100" },
  ]

  const shortcuts = [
    {
      name: "React Developers",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=40&h=40&fit=crop",
      icon: Camera,
    },
    {
      name: "JavaScript Community",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=40&h=40&fit=crop",
      icon: Star,
    },
    {
      name: "Tech Marketplace",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop",
      icon: ShoppingBag,
    },
    { 
      name: "UI/UX Design", 
      image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=40&h=40&fit=crop",
      icon: Heart,
    },
    {
      name: "Gaming Hub",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=40&h=40&fit=crop",
      icon: Gamepad2,
    },
    {
      name: "Car Enthusiasts",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=40&h=40&fit=crop",
      icon: Car,
    },
    {
      name: "Music Lovers",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop",
      icon: Music,
    },
    {
      name: "Local Marketplace",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop",
      icon: MapPin,
    },
  ]

  return (
    <div className="p-4 space-y-4">
      {/* User Profile */}
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
        <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full" />
        <span className="font-medium text-gray-900">{currentUser.name}</span>
      </div>

      {/* Main Menu */}
      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <item.icon className={`w-8 h-8 ${item.color} ${item.bgColor} p-1.5 rounded-full`} />
              <span className="font-medium text-gray-900">{item.label}</span>
            </div>
            {item.count && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-semibold">
                {item.count.toLocaleString()}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* See More */}
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
        <ChevronDown className="w-8 h-8 text-gray-600 bg-gray-200 p-1.5 rounded-full" />
        <span className="font-medium text-gray-900">See more</span>
      </div>

      <hr className="border-gray-300" />

      {/* Your Shortcuts */}
      <div className="space-y-3">
        <h3 className="text-gray-600 font-semibold text-sm">Your shortcuts</h3>
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group">
            <div className="relative">
              <img src={shortcut.image} alt={shortcut.name} className="w-8 h-8 rounded-lg object-cover" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <shortcut.icon className="w-2.5 h-2.5 text-gray-600" />
              </div>
            </div>
            <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{shortcut.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
