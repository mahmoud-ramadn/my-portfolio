import { MessageCircle, MoreHorizontal, Phone, Search, Video } from "lucide-react"

import { fakeUsers } from "@/lib/fakeData"

export default function FacebookRightSidebar() {
  // Filter out current user and get contacts
  const contacts = fakeUsers.slice(1) // Remove current user (John Doe)

  const sponsored = [
    {
      title: "Learn React Development",
      description: "Master React in 30 days with our comprehensive course",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
      sponsor: "CodeAcademy",
      price: "$49.99",
      originalPrice: "$199.99"
    },
    {
      title: "New iPhone 15 Pro",
      description: "Experience the latest technology with amazing camera",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
      sponsor: "Apple",
      price: "$999",
      originalPrice: null
    },
    {
      title: "Gaming Chair Sale",
      description: "Ergonomic gaming chair with RGB lighting - 50% off!",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=100&h=100&fit=crop",
      sponsor: "Gaming Store",
      price: "$299",
      originalPrice: "$599"
    },
    {
      title: "Premium Coffee Beans",
      description: "Single origin Colombian coffee, freshly roasted",
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=100&h=100&fit=crop",
      sponsor: "Coffee Paradise",
      price: "$24.99",
      originalPrice: null
    }
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Sponsored */}
      <div>
        <h3 className="text-gray-600 font-semibold text-sm mb-3">Sponsored</h3>
        <div className="space-y-4">
          {sponsored.map((ad, index) => (
            <div key={index} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
              <img src={ad.image} alt={ad.title} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{ad.title}</h4>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">{ad.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    {ad.price && (
                      <span className="text-green-600 font-semibold text-sm">{ad.price}</span>
                    )}
                    {ad.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">{ad.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs">{ad.sponsor}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-600 font-semibold text-sm">Contacts</h3>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Video className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Search className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer group"
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full" />
                {contact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <span className="flex-1 text-gray-900 text-sm font-medium">{contact.name}</span>

              <div className="hidden group-hover:flex space-x-1">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Phone className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
