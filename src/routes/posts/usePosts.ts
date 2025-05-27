import React from "react"
import type { Post } from "../../data/posts"

export const usePosts = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>("")
  const [posts, setPosts] = React.useState<Post[]>([])

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts?_embed=comments")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(fetchPosts, 2000)
    return () => clearTimeout(timer)
  }, [])

  return { isLoading, error, posts }
}
