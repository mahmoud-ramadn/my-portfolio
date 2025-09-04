import { useState, useEffect } from 'react'
import { apiService, API_BASE_URL, type Post, type User, type Product, fakePosts, fakeUsers, fakeProducts } from './fakeData'

// Comment interface
interface Comment {
  id: number
  content: string
  user: {
    id: number
    name: string
    username: string
    avatar: string
  }
  timestamp: string
  likes: number
}

// Hook for fetching posts
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(fakePosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const apiPosts = await apiService.getPosts()
      setPosts(apiPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Failed to fetch posts')
      setPosts(fakePosts) // Fallback to local data
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (content: string) => {
    try {
      const newPost = await apiService.createPost(content)
      if (newPost) {
        setPosts(prev => [newPost, ...prev])
        return true
      }
      return false
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Failed to create post')
      return false
    }
  }

  const toggleLike = async (postId: number) => {
    try {
      const success = await apiService.toggleLike(postId)
      if (success) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1
              }
            : post
        ))
      }
      return success
    } catch (error) {
      console.error('Error toggling like:', error)
      setError('Failed to toggle like')
      return false
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    toggleLike
  }
}

// Hook for fetching users
export function useUsers() {
  const [users, setUsers] = useState<User[]>(fakeUsers)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const apiUsers = await apiService.getUsers()
      setUsers(apiUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to fetch users')
      setUsers(fakeUsers) // Fallback to local data
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    fetchUsers
  }
}

// Hook for fetching comments
export function useComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    if (!postId) return
    
    setLoading(true)
    setError(null)
    try {
      const apiComments: Comment[] = await apiService.getComments(postId)
      setComments(apiComments)
    } catch (error) {
      console.error('Error fetching comments:', error)
      setError('Failed to fetch comments')
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  return {
    comments,
    loading,
    error,
    fetchComments
  }
}

// Hook for API status
export function useApiStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/1`)
      setIsOnline(response.ok)
      setLastChecked(new Date())
    } catch (error) {
      console.error('API status check failed:', error)
      setIsOnline(false)
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkApiStatus()
    const interval = setInterval(checkApiStatus, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  return {
    isOnline,
    lastChecked,
    checkApiStatus
  }
}

// Hook for marketplace products
export function useProducts(filters?: {
  category?: string
  priceRange?: string
  condition?: string
  searchQuery?: string
  sortBy?: string
  limit?: number
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchProducts = async (loadMore = false) => {
    if (loading) return
    
    setLoading(true)
    setError(null)
    
    try {
      const apiProducts = await apiService.getProducts(filters)
      
      if (loadMore) {
        setProducts(prev => [...prev, ...apiProducts])
      } else {
        setProducts(apiProducts)
      }
      
      setHasMore(apiProducts.length >= (filters?.limit || 20))
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to fetch products')
      if (!loadMore) {
        setProducts(fakeProducts.slice(0, 20)) // Fallback to local data
      }
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (productId: number) => {
    try {
      const success = await apiService.toggleProductFavorite(productId)
      if (success) {
        setProducts(prev => prev.map(product => 
          product.id === productId 
            ? { ...product, isFavorite: !product.isFavorite }
            : product
        ))
      }
      return success
    } catch (error) {
      console.error('Error toggling favorite:', error)
      return false
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(true)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filters?.category, filters?.priceRange, filters?.condition, filters?.searchQuery, filters?.sortBy])

  return {
    products,
    loading,
    error,
    hasMore,
    fetchProducts,
    toggleFavorite,
    loadMore
  }
}

// Hook for single product
export function useProduct(productId: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = async () => {
    if (!productId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const apiProduct = await apiService.getProductById(productId)
      setProduct(apiProduct)
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('Failed to fetch product')
      // Fallback to local data
      const fallbackProduct = fakeProducts.find(p => p.id === productId)
      setProduct(fallbackProduct || null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [productId])

  return {
    product,
    loading,
    error,
    fetchProduct
  }
}