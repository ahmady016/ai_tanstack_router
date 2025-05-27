import { createRoute } from '@tanstack/react-router'
import { HiInformationCircle } from 'react-icons/hi'
import { Alert, Spinner } from 'flowbite-react'

import { postsRoute } from './Posts'
import { type Comment } from '../../data/posts'
import { usePost } from './usePost'

export const postDetailsRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '/$postId',
  params: {
    parse: rawParams => {
      const postId = Number(rawParams.postId)
      return { postId: isNaN(postId) ? 0 : postId }
    },
  },
  component: PostDetails
})

function PostDetails() {
  const { postId } = postDetailsRoute.useParams()
  const { isLoading, error, post } = usePost(postId)

  if (isLoading)
    return (
      <div className="h-9/10 flex justify-center items-center">
        <Spinner size="xl" aria-label="Extra large spinner example" />
      </div>
    )

  if (error)
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Error loading post with Id({postId}): {error}</span>
      </Alert>
    )

  if (!post)
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">POST NOT FOUND</span>
      </div>
    )

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-600 mb-6">{post.content}</p>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        {post.comments?.map((comment: Comment) => (
          <div key={comment.id} className="mb-4 p-4 bg-gray-50 rounded">
            <p className="font-medium text-gray-700">{comment.author}</p>
            <p className="text-gray-500">{comment.content}</p>
          </div>
        )) ?? (
            <p className="text-gray-500">No comments yet</p>
          )}
      </div>
    </div>
  )
}

export default postDetailsRoute
