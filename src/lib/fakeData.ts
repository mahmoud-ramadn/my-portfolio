// API Configuration
export const API_BASE_URL = "https://jsonplaceholder.typicode.com"
export const PRODUCTS_API_URL = "https://dummyjson.com"

// DummyJSON API Response interfaces
interface DummyProduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface DummyProductsResponse {
  products: DummyProduct[]
  total: number
  skip: number
  limit: number
}

// API Response interfaces
interface ApiPost {
  id: number
  userId: number
  title: string
  body: string
}

interface ApiUser {
  id: number
  name: string
  username: string
  email: string
  website: string
  company: {
    catchPhrase: string
  }
  address: {
    city: string
    zipcode: string
  }
}

interface ApiComment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

// API Service Functions
export const apiService = {
  // Fetch posts from API
  async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`)
      const posts: ApiPost[] = await response.json()

      // Transform API data to match our interface
      return posts.slice(0, 10).map((post: ApiPost, index: number) => ({
        id: post.id,
        content: post.body,
        user: {
          id: post.userId,
          name: fakeUsers[index % fakeUsers.length].name,
          username: fakeUsers[index % fakeUsers.length].username,
          avatar: `https://i.pravatar.cc/150?img=${post.userId}`,
          coverPhoto: `https://picsum.photos/850/320?random=${post.userId}`,
          bio: fakeUsers[index % fakeUsers.length].bio,
          location: fakeUsers[index % fakeUsers.length].location,
          website: fakeUsers[index % fakeUsers.length].website,
          joinDate: fakeUsers[index % fakeUsers.length].joinDate,
          friends: Math.floor(Math.random() * 1000) + 100,
          following: Math.floor(Math.random() * 800) + 50,
          followers: Math.floor(Math.random() * 2000) + 200,
          isOnline: Math.random() > 0.5,
          lastSeen: Math.random() > 0.7 ? `${Math.floor(Math.random() * 24)} hours ago` : undefined,
        },
        type: "text" as const,
        media:
          Math.random() > 0.6
            ? [
                {
                  type: "image" as const,
                  url: `https://picsum.photos/600/400?random=${post.id}`,
                },
              ]
            : undefined,
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toLocaleString(),
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 20),
        isLiked: Math.random() > 0.7,
        location: Math.random() > 0.6 ? fakeUsers[index % fakeUsers.length].location : undefined,
      }))
    } catch (error) {
      console.error("Error fetching posts from API:", error)
      return fakePosts // Fallback to local data
    }
  },

  // Fetch users from API
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`)
      const users: ApiUser[] = await response.json()

      return users.map((user: ApiUser) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: `https://i.pravatar.cc/150?img=${user.id}`,
        coverPhoto: `https://picsum.photos/850/320?random=${user.id + 100}`,
        bio: `${user.company.catchPhrase} | ${user.address.city}`,
        location: `${user.address.city}, ${user.address.zipcode}`,
        website: user.website,
        joinDate: "January 2020",
        friends: Math.floor(Math.random() * 1000) + 100,
        following: Math.floor(Math.random() * 800) + 50,
        followers: Math.floor(Math.random() * 2000) + 200,
        isOnline: Math.random() > 0.5,
        lastSeen: Math.random() > 0.7 ? `${Math.floor(Math.random() * 24)} hours ago` : undefined,
      }))
    } catch (error) {
      console.error("Error fetching users from API:", error)
      return fakeUsers // Fallback to local data
    }
  },

  // Fetch comments for a specific post
  async getComments(postId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`)
      const comments: ApiComment[] = await response.json()

      return comments.slice(0, 5).map((comment: ApiComment) => ({
        id: comment.id,
        content: comment.body,
        user: {
          id: comment.id,
          name: comment.name,
          username: comment.email.split("@")[0],
          avatar: `https://i.pravatar.cc/150?img=${comment.id + 50}`,
        },
        timestamp: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
        likes: Math.floor(Math.random() * 20),
      }))
    } catch (error) {
      console.error("Error fetching comments:", error)
      return []
    }
  },

  // Create a new post
  async createPost(content: string, userId: number = 1): Promise<Post | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: content.slice(0, 50),
          body: content,
          userId: userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      const newPost: ApiPost = await response.json()

      return {
        id: newPost.id,
        content: newPost.body,
        user: fakeUsers[0], // Current user
        type: "text",
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
      }
    } catch (error) {
      console.error("Error creating post:", error)
      return null
    }
  },

  // Like/Unlike a post
  async toggleLike(postId: number): Promise<boolean> {
    try {
      // Simulate API call (in real app, would send postId to server)
      console.log(`Toggling like for post ${postId}`)
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Math.random() > 0.1 // 90% success rate
    } catch (error) {
      console.error("Error toggling like:", error)
      return false
    }
  },

  // Fetch marketplace products from DummyJSON
  async getProducts(filters?: {
    category?: string
    priceRange?: string
    condition?: string
    searchQuery?: string
    sortBy?: string
    limit?: number
    skip?: number
  }): Promise<Product[]> {
    try {
      // Simulate API delay for realistic loading
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

      let url = `${PRODUCTS_API_URL}/products`
      const params = new URLSearchParams()

      // Apply search query
      if (filters?.searchQuery?.trim()) {
        url = `${PRODUCTS_API_URL}/products/search`
        params.append("q", filters.searchQuery.trim())
      }

      // Apply category filter
      if (filters?.category && filters.category !== "all") {
        url = `${PRODUCTS_API_URL}/products/category/${encodeURIComponent(filters.category)}`
      }

      // Add pagination
      params.append("limit", String(filters?.limit || 20))
      params.append("skip", String(filters?.skip || 0))

      // Add sorting
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case "price-low":
            params.append("sortBy", "price")
            params.append("order", "asc")
            break
          case "price-high":
            params.append("sortBy", "price")
            params.append("order", "desc")
            break
          case "rating":
            params.append("sortBy", "rating")
            params.append("order", "desc")
            break
        }
      }

      const fullUrl = `${url}?${params.toString()}`
      console.log("Fetching from DummyJSON:", fullUrl)

      const response = await fetch(fullUrl)
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data: DummyProductsResponse = await response.json()

      // Transform DummyJSON products to our Product interface
      let products = data.products.map((product: DummyProduct, index: number) => ({
        id: product.id,
        title: product.title,
        price: Math.round(product.price),
        currency: "$",
        image: product.thumbnail,
        seller: {
          id: (product.id % fakeUsers.length) + 1,
          name: fakeUsers[index % fakeUsers.length].name,
          username: fakeUsers[index % fakeUsers.length].username,
          avatar: fakeUsers[index % fakeUsers.length].avatar,
          coverPhoto: fakeUsers[index % fakeUsers.length].coverPhoto,
          bio: fakeUsers[index % fakeUsers.length].bio,
          location: fakeUsers[index % fakeUsers.length].location,
          website: fakeUsers[index % fakeUsers.length].website,
          joinDate: fakeUsers[index % fakeUsers.length].joinDate,
          friends: fakeUsers[index % fakeUsers.length].friends,
          following: fakeUsers[index % fakeUsers.length].following,
          followers: fakeUsers[index % fakeUsers.length].followers,
          isOnline: fakeUsers[index % fakeUsers.length].isOnline,
          lastSeen: fakeUsers[index % fakeUsers.length].lastSeen,
        },
        category: this.mapDummyCategory(product.category),
        condition: this.getRandomCondition(),
        location: this.getRandomLocation(),
        description: product.description,
        rating: Math.round(product.rating * 10) / 10,
        reviews: Math.floor(Math.random() * 200) + 10,
        isAvailable: product.stock > 0,
        tags: [product.brand, product.category].filter(Boolean),
        isFavorite: false,
      }))

      // Apply client-side filters for options not supported by DummyJSON
      if (filters?.condition && filters.condition !== "all") {
        products = products.filter((product) => product.condition === filters.condition)
      }

      if (filters?.priceRange && filters.priceRange !== "all") {
        products = products.filter((product) => {
          switch (filters.priceRange) {
            case "under100":
              return product.price < 100
            case "100-500":
              return product.price >= 100 && product.price <= 500
            case "500-1000":
              return product.price >= 500 && product.price <= 1000
            case "over1000":
              return product.price > 1000
            default:
              return true
          }
        })
      }

      return products
    } catch (error) {
      console.error("Error fetching products from DummyJSON:", error)
      return fakeProducts.slice(0, filters?.limit || 20) // Fallback to local data
    }
  },

  // Helper method to map DummyJSON categories to our categories
  mapDummyCategory(category: string): string {
    const categoryMap: Record<string, string> = {
      smartphones: "Electronics",
      laptops: "Computers",
      fragrances: "Fashion",
      skincare: "Fashion",
      groceries: "Home",
      "home-decoration": "Home",
      furniture: "Home",
      tops: "Fashion",
      "womens-dresses": "Fashion",
      "womens-shoes": "Fashion",
      "mens-shirts": "Fashion",
      "mens-shoes": "Fashion",
      "mens-watches": "Fashion",
      "womens-watches": "Fashion",
      "womens-bags": "Fashion",
      "womens-jewellery": "Fashion",
      sunglasses: "Fashion",
      automotive: "Vehicles",
      motorcycle: "Vehicles",
      lighting: "Home",
      "sports-accessories": "Sports",
    }
    return categoryMap[category] || "Electronics"
  },

  // Helper method to get random condition
  getRandomCondition(): "new" | "used" | "refurbished" {
    const weights = [0.4, 0.5, 0.1] // 40% new, 50% used, 10% refurbished
    const random = Math.random()

    if (random < weights[0]) return "new"
    if (random < weights[0] + weights[1]) return "used"
    return "refurbished"
  },

  // Helper method to get random location
  getRandomLocation(): string {
    const locations = [
      "New York, NY",
      "Los Angeles, CA",
      "Chicago, IL",
      "Houston, TX",
      "Phoenix, AZ",
      "Philadelphia, PA",
      "San Antonio, TX",
      "San Diego, CA",
      "Dallas, TX",
      "San Jose, CA",
      "Austin, TX",
      "Jacksonville, FL",
      "Fort Worth, TX",
      "Columbus, OH",
      "Charlotte, NC",
      "San Francisco, CA",
      "Indianapolis, IN",
      "Seattle, WA",
      "Denver, CO",
      "Boston, MA",
    ]
    return locations[Math.floor(Math.random() * locations.length)]
  },

  // Get available categories from DummyJSON
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${PRODUCTS_API_URL}/products/categories`)
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`)
      }
      const categories: string[] = await response.json()
      return categories
    } catch (error) {
      console.error("Error fetching categories from DummyJSON:", error)
      return ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"]
    }
  },

  // Get product by ID from DummyJSON
  async getProductById(productId: number): Promise<Product | null> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const response = await fetch(`${PRODUCTS_API_URL}/products/${productId}`)
      if (!response.ok) {
        throw new Error(`Product not found: ${response.status}`)
      }

      const dummyProduct: DummyProduct = await response.json()

      // Transform to our Product interface
      const product: Product = {
        id: dummyProduct.id,
        title: dummyProduct.title,
        price: Math.round(dummyProduct.price),
        currency: "$",
        image: dummyProduct.thumbnail,
        seller: fakeUsers[0], // Use first user as seller
        category: this.mapDummyCategory(dummyProduct.category),
        condition: this.getRandomCondition(),
        location: this.getRandomLocation(),
        description: dummyProduct.description,
        rating: Math.round(dummyProduct.rating * 10) / 10,
        reviews: Math.floor(Math.random() * 200) + 10,
        isAvailable: dummyProduct.stock > 0,
        tags: [dummyProduct.brand, dummyProduct.category].filter(Boolean),
        isFavorite: false,
      }

      return product
    } catch (error) {
      console.error("Error fetching product from DummyJSON:", error)
      // Fallback to local data
      const fallbackProduct = fakeProducts.find((p) => p.id === productId)
      return fallbackProduct || null
    }
  },

  // Toggle product favorite/bookmark
  async toggleProductFavorite(productId: number): Promise<boolean> {
    try {
      console.log(`Toggling favorite for product ${productId}`)
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Math.random() > 0.1 // 90% success rate
    } catch (error) {
      console.error("Error toggling favorite:", error)
      return false
    }
  },
}

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
  isFavorite?: boolean
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
    tags: ["smartphone", "apple", "technology"],
  },
  {
    id: 2,
    title: 'MacBook Pro 16" M3 Pro',
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
    tags: ["laptop", "apple", "programming"],
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
    tags: ["sneakers", "nike", "basketball"],
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
    tags: ["camera", "photography", "professional"],
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
    tags: ["gaming", "pc", "rtx"],
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
    tags: ["vintage", "leather", "fashion"],
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
    tags: ["electric", "tesla", "car"],
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
    tags: ["furniture", "dining", "wood"],
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
    tags: ["playstation", "gaming", "console"],
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
    tags: ["bike", "mountain", "sports"],
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
    tags: ["luxury", "handbag", "designer"],
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
    tags: ["security", "smart-home", "electronics"],
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
    tags: ["guitar", "music", "fender"],
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
    tags: ["baby", "stroller", "kids"],
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
    tags: ["books", "education", "computer-science"],
  },
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
  },
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
