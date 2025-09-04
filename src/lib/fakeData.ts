export interface User {
  id: number
  name: string
  username: string
  avatar: string
  coverPhoto: string
  bio: string
  location: string
  website: string
  joinDate: string
  friends: number
  following: number
  followers: number
  isOnline: boolean
  lastSeen?: string
}

export interface Post {
  id: number
  user: User
  content: string
  type: "text" | "image" | "video" | "link"
  media?: {
    type: "image" | "video"
    url: string
    thumbnail?: string
  }[]
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  location?: string
  feeling?: string
}

export interface Story {
  id: number
  user: User
  type: "image" | "video"
  media: string
  timestamp: string
  isViewed: boolean
}

// Fake users data
export const fakeUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=850&h=320&fit=crop",
    bio: "Software Developer | Tech Enthusiast | Coffee Lover ☕",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    joinDate: "January 2020",
    friends: 1247,
    following: 892,
    followers: 1543,
    isOnline: true,
  },
  {
    id: 2,
    name: "Emma Watson",
    username: "emmawatson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=850&h=320&fit=crop",
    bio: "Actress & Activist | UN Women Goodwill Ambassador 🌟",
    location: "London, UK",
    website: "emmawatson.com",
    joinDate: "March 2019",
    friends: 2543,
    following: 234,
    followers: 5672,
    isOnline: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    username: "michaelchen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=850&h=320&fit=crop",
    bio: "Digital Nomad | Travel Photographer 📸",
    location: "Traveling the World",
    website: "michaelchenphotos.com",
    joinDate: "June 2021",
    friends: 891,
    following: 1234,
    followers: 2156,
    isOnline: false,
    lastSeen: "2 hours ago",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    username: "sarahjohnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=850&h=320&fit=crop",
    bio: "UX Designer | Dog Mom 🐕 | Yoga Enthusiast",
    location: "Austin, TX",
    website: "sarahdesigns.co",
    joinDate: "August 2020",
    friends: 675,
    following: 543,
    followers: 987,
    isOnline: true,
  },
  {
    id: 5,
    name: "David Rodriguez",
    username: "davidrodriguez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=850&h=320&fit=crop",
    bio: "Chef & Food Blogger | Cooking is my passion 👨‍🍳",
    location: "New York, NY",
    website: "davidcooks.com",
    joinDate: "November 2018",
    friends: 1876,
    following: 432,
    followers: 3245,
    isOnline: false,
    lastSeen: "1 day ago",
  },
  {
    id: 6,
    name: "Lisa Park",
    username: "lisapark",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=850&h=320&fit=crop",
    bio: "Marketing Manager | Runner 🏃‍♀️ | Plant Parent 🌱",
    location: "Seattle, WA",
    website: "lisamarketing.com",
    joinDate: "February 2021",
    friends: 934,
    following: 678,
    followers: 1234,
    isOnline: true,
  },
]

// Fake posts data
export const fakePosts: Post[] = [
  {
    id: 1,
    user: fakeUsers[1], // Emma Watson
    content:
      "Just wrapped up an amazing photoshoot for our upcoming campaign! The team was incredible and I can't wait to share the results with you all. Stay tuned! ✨📸",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "2 hours ago",
    likes: 1247,
    comments: 89,
    shares: 23,
    isLiked: false,
    location: "Los Angeles, CA",
  },
  {
    id: 2,
    user: fakeUsers[2], // Michael Chen
    content:
      "Caught this incredible sunset while hiking in the Swiss Alps! Sometimes you just have to stop and appreciate the beauty around us. Nature never fails to amaze me! 🏔️",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "4 hours ago",
    likes: 892,
    comments: 67,
    shares: 12,
    isLiked: true,
    location: "Swiss Alps, Switzerland",
  },
  {
    id: 3,
    user: fakeUsers[4], // David Rodriguez
    content:
      "Today's special: Homemade pasta with truffle cream sauce! 🍝 The secret is in the fresh ingredients and a lot of love. Recipe coming to the blog this weekend!",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "6 hours ago",
    likes: 567,
    comments: 45,
    shares: 8,
    isLiked: false,
    location: "New York, NY",
  },
  {
    id: 4,
    user: fakeUsers[3], // Sarah Johnson
    content:
      "Finished redesigning the mobile app for our client today! It's amazing how small changes can make such a big impact on user experience. Love what I do! 💻✨",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "8 hours ago",
    likes: 234,
    comments: 18,
    shares: 5,
    isLiked: true,
    location: "Austin, TX",
  },
  {
    id: 5,
    user: fakeUsers[0], // John Doe
    content:
      "Just deployed my latest React project! 🚀 Built with TypeScript, Tailwind CSS, and lots of coffee. The feeling when everything works perfectly is unmatched. Check it out!",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "12 hours ago",
    likes: 156,
    comments: 23,
    shares: 7,
    isLiked: false,
    location: "San Francisco, CA",
  },
  {
    id: 6,
    user: fakeUsers[5], // Lisa Park
    content:
      "Morning run complete! 5 miles through the beautiful Seattle waterfront. Nothing beats starting the day with some fresh air and exercise. Who else is staying active today? 🏃‍♀️💪",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "1 day ago",
    likes: 89,
    comments: 12,
    shares: 3,
    isLiked: false,
    location: "Seattle, WA",
  },
  {
    id: 7,
    user: fakeUsers[1], // Emma Watson
    content:
      "🛍️ MARKETPLACE POST: Selling my barely used iPhone 15 Pro Max! 📱 Perfect condition, includes all original accessories and wireless charger. Great deal for someone looking to upgrade! DM me if interested 💫",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "2 days ago",
    likes: 342,
    comments: 87,
    shares: 15,
    isLiked: true,
    location: "Los Angeles, CA",
  },
  {
    id: 8,
    user: fakeUsers[2], // Michael Chen
    content:
      "📸 FOR SALE: Professional Canon camera setup! Perfect for aspiring photographers or content creators. Includes lens kit, tripod, and camera bag. Moving abroad and need to sell quickly! 🌍",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "3 days ago",
    likes: 178,
    comments: 34,
    shares: 8,
    isLiked: false,
    location: "Swiss Alps, Switzerland",
  },
  {
    id: 9,
    user: fakeUsers[4], // David Rodriguez
    content:
      "🍴 SPECIAL OFFER: Hosting a cooking class this weekend! Learn to make authentic Italian pasta from scratch. Limited spots available, ingredients included! Book now through my website 👨‍🍳✨",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "4 days ago",
    likes: 423,
    comments: 67,
    shares: 28,
    isLiked: true,
    location: "New York, NY",
  },
  {
    id: 10,
    user: fakeUsers[5], // Lisa Park
    content:
      "🏃‍♀️ MARKETPLACE: Selling my running gear collection! High-quality Nike and Adidas items, barely worn. Perfect for someone starting their fitness journey. Everything must go! 💪",
    type: "image",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551107696-a4b537c892a2?w=600&h=400&fit=crop",
      },
    ],
    timestamp: "5 days ago",
    likes: 156,
    comments: 23,
    shares: 9,
    isLiked: false,
    location: "Seattle, WA",
  },
]

// Shop/Product interface
export interface Product {
  id: number
  title: string
  price: number
  currency: string
  image: string
  seller: User
  category: string
  condition: "new" | "used" | "refurbished"
  location: string
  description: string
  rating: number
  reviews: number
  isAvailable: boolean
  tags: string[]
}

// Marketplace/Shop data
export const fakeProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB",
    price: 1199,
    currency: "$",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    seller: fakeUsers[1],
    category: "Electronics",
    condition: "new",
    location: "Los Angeles, CA",
    description: "Brand new iPhone 15 Pro Max in Titanium Blue. Never opened, still in original packaging.",
    rating: 4.9,
    reviews: 127,
    isAvailable: true,
    tags: ["smartphone", "apple", "technology"]
  },
  {
    id: 2,
    title: "MacBook Pro 16\" M3 Pro",
    price: 2499,
    currency: "$",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    seller: fakeUsers[2],
    category: "Computers",
    condition: "used",
    location: "San Francisco, CA",
    description: "Excellent condition MacBook Pro, used for light development work. Includes original charger.",
    rating: 4.7,
    reviews: 89,
    isAvailable: true,
    tags: ["laptop", "apple", "programming"]
  },
  {
    id: 3,
    title: "Nike Air Jordan 1 Retro High",
    price: 179,
    currency: "$",
    image: "https://images.unsplash.com/photo-1551107696-a4b537c892a2?w=400&h=400&fit=crop",
    seller: fakeUsers[3],
    category: "Fashion",
    condition: "new",
    location: "New York, NY",
    description: "Classic Air Jordan 1 in Chicago colorway. Size 10.5, never worn.",
    rating: 4.8,
    reviews: 203,
    isAvailable: true,
    tags: ["sneakers", "nike", "basketball"]
  },
  {
    id: 4,
    title: "Canon EOS R6 Mark II Camera",
    price: 2399,
    currency: "$",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    seller: fakeUsers[4],
    category: "Photography",
    condition: "used",
    location: "Austin, TX",
    description: "Professional camera in excellent condition. Perfect for photography enthusiasts.",
    rating: 4.9,
    reviews: 156,
    isAvailable: true,
    tags: ["camera", "photography", "professional"]
  },
  {
    id: 5,
    title: "Gaming Setup - RTX 4080 PC",
    price: 3299,
    currency: "$",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop",
    seller: fakeUsers[5],
    category: "Gaming",
    condition: "new",
    location: "Seattle, WA",
    description: "High-end gaming PC with RTX 4080, perfect for 4K gaming and streaming.",
    rating: 5.0,
    reviews: 67,
    isAvailable: true,
    tags: ["gaming", "pc", "rtx"]
  },
  {
    id: 6,
    title: "Vintage Leather Jacket",
    price: 89,
    currency: "$",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    seller: fakeUsers[0],
    category: "Fashion",
    condition: "used",
    location: "Portland, OR",
    description: "Authentic vintage leather jacket from the 80s. Size M, great condition.",
    rating: 4.6,
    reviews: 43,
    isAvailable: true,
    tags: ["vintage", "leather", "fashion"]
  },
  {
    id: 7,
    title: "Tesla Model 3 2022",
    price: 42000,
    currency: "$",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
    seller: fakeUsers[1],
    category: "Vehicles",
    condition: "used",
    location: "Los Angeles, CA",
    description: "Excellent condition Tesla Model 3. Low mileage, autopilot included.",
    rating: 4.8,
    reviews: 24,
    isAvailable: true,
    tags: ["electric", "tesla", "car"]
  },
  {
    id: 8,
    title: "Dining Table Set - Oak Wood",
    price: 650,
    currency: "$",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    seller: fakeUsers[2],
    category: "Home",
    condition: "used",
    location: "Austin, TX",
    description: "Beautiful oak dining table with 6 chairs. Perfect for family dinners.",
    rating: 4.7,
    reviews: 38,
    isAvailable: true,
    tags: ["furniture", "dining", "wood"]
  },
  {
    id: 9,
    title: "PlayStation 5 Console",
    price: 499,
    currency: "$",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    seller: fakeUsers[3],
    category: "Gaming",
    condition: "new",
    location: "Miami, FL",
    description: "Brand new PS5 console, still sealed. Includes controller and all cables.",
    rating: 4.9,
    reviews: 156,
    isAvailable: true,
    tags: ["playstation", "gaming", "console"]
  },
  {
    id: 10,
    title: "Mountain Bike - Trek",
    price: 890,
    currency: "$",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    seller: fakeUsers[4],
    category: "Sports",
    condition: "used",
    location: "Denver, CO",
    description: "High-quality Trek mountain bike. Great for trails and outdoor adventures.",
    rating: 4.6,
    reviews: 72,
    isAvailable: true,
    tags: ["bike", "mountain", "sports"]
  },
  {
    id: 11,
    title: "Designer Handbag - Gucci",
    price: 1850,
    currency: "$",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    seller: fakeUsers[5],
    category: "Fashion",
    condition: "used",
    location: "New York, NY",
    description: "Authentic Gucci handbag in excellent condition. Comes with dust bag and certificate.",
    rating: 4.8,
    reviews: 94,
    isAvailable: true,
    tags: ["luxury", "handbag", "designer"]
  },
  {
    id: 12,
    title: "Smart Home Security System",
    price: 299,
    currency: "$",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop",
    seller: fakeUsers[0],
    category: "Electronics",
    condition: "new",
    location: "San Jose, CA",
    description: "Complete smart home security system with cameras and sensors. Easy installation.",
    rating: 4.5,
    reviews: 128,
    isAvailable: true,
    tags: ["security", "smart-home", "electronics"]
  },
  {
    id: 13,
    title: "Electric Guitar - Fender",
    price: 750,
    currency: "$",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    seller: fakeUsers[1],
    category: "Music",
    condition: "used",
    location: "Nashville, TN",
    description: "Classic Fender Stratocaster in great condition. Perfect for rock and blues.",
    rating: 4.7,
    reviews: 85,
    isAvailable: true,
    tags: ["guitar", "music", "fender"]
  },
  {
    id: 14,
    title: "Baby Stroller - Luxury",
    price: 280,
    currency: "$",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop",
    seller: fakeUsers[2],
    category: "Baby",
    condition: "used",
    location: "Chicago, IL",
    description: "High-end baby stroller with all accessories. Barely used, excellent condition.",
    rating: 4.8,
    reviews: 47,
    isAvailable: true,
    tags: ["baby", "stroller", "kids"]
  },
  {
    id: 15,
    title: "Textbook Collection - Computer Science",
    price: 125,
    currency: "$",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    seller: fakeUsers[3],
    category: "Books",
    condition: "used",
    location: "Boston, MA",
    description: "Collection of computer science textbooks. Perfect for students. Great condition.",
    rating: 4.4,
    reviews: 31,
    isAvailable: true,
    tags: ["books", "education", "computer-science"]
  }
]

// Fake stories data
export const fakeStories: Story[] = [
  {
    id: 1,
    user: fakeUsers[1],
    type: "image",
    media: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=120&h=200&fit=crop",
    timestamp: "3 hours ago",
    isViewed: false,
  },
  {
    id: 2,
    user: fakeUsers[2],
    type: "video",
    media: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=200&fit=crop",
    timestamp: "5 hours ago",
    isViewed: true,
  },
  {
    id: 3,
    user: fakeUsers[3],
    type: "image",
    media: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=120&h=200&fit=crop",
    timestamp: "8 hours ago",
    isViewed: false,
  },
  {
    id: 4,
    user: fakeUsers[4],
    type: "image",
    media: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=120&h=200&fit=crop",
    timestamp: "12 hours ago",
    isViewed: true,
  },
  {
    id: 5,
    user: fakeUsers[5],
    type: "image",
    media: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=120&h=200&fit=crop",
    timestamp: "1 day ago",
    isViewed: false,
  },
  {
    id: 6,
    user: fakeUsers[0],
    type: "image",
    media: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=200&fit=crop",
    timestamp: "2 days ago",
    isViewed: true,
  }
]

// Search function
export function searchUsers(query: string): User[] {
  if (!query.trim()) return []

  const lowercaseQuery = query.toLowerCase()
  return fakeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.bio.toLowerCase().includes(lowercaseQuery)
  )
}

export function searchPosts(query: string): Post[] {
  if (!query.trim()) return []

  const lowercaseQuery = query.toLowerCase()
  return fakePosts.filter(
    (post) =>
      post.content.toLowerCase().includes(lowercaseQuery) || post.user.name.toLowerCase().includes(lowercaseQuery)
  )
}
