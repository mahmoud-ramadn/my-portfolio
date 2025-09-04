import { fakePosts } from "@/lib/fakeData"

import CreatePost from "./CreatePost.tsx"
import Marketplace from "./Marketplace.tsx"
import Post from "./Post.tsx"
import Stories from "./Stories.tsx"

export default function FacebookFeed() {
  return (
    <div className="py-6 space-y-6 max-w-2xl mx-auto">
      {/* Stories */}
      <Stories />

      {/* Create Post */}
      <CreatePost />

      {/* Marketplace */}
      <Marketplace />

      {/* Posts */}
      {fakePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
