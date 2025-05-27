import React from 'react'
import  type { Post } from '../../data/posts'

export const usePost = (postId: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>("")
  const [post, setPost] = React.useState<Post | undefined>(undefined)

  const fetchPost = (postId: number) => async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}?_embed=comments`)
      const data = await response.json()
      setPost(data)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(fetchPost(postId), 2000)
    return () => clearTimeout(timer)
  }, [postId])

  return { isLoading, error, post }
}
