import React from 'react'
import { createRoute, Link } from '@tanstack/react-router'
import { FaSailboat } from 'react-icons/fa6'
import { TfiCommentAlt } from 'react-icons/tfi'
import { HiInformationCircle } from 'react-icons/hi'
import { Alert, Button, Spinner } from 'flowbite-react'

import { type Post, type Comment } from '../../data/posts'
import { usePosts } from './usePosts'

import { rootRoute } from '../__root'

export const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'posts',
})

export const postsIndexRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '/',
  component: Posts,
})

const PostItem = ({ id, title, content, comments }: Post) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <li className="border-b pb-4">
      <h3 className="text-xl font-semibold">
        <Link
          to="/posts/$postId"
          params={{ postId: Number(id) }}
          className="text-xl font-semibold hover:text-blue-600 transition-colors"
        >
          {title}
        </Link>
      </h3>
      <p className="text-gray-600">{content}</p>
      <div className="mt-4 space-y-2">
        <button
          className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer bg-gray-200 hover:bg-gray-700 hover:[&>h4,&>svg]:text-white"
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            className="w-4 h-4 transition-all duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={expanded ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
            />
          </svg>
          <h4 className="text-sm font-medium text-gray-700 flex justify-start items-center">
            <TfiCommentAlt className="mr-[7px] mt-[2px]" />
            <span>Comments ({comments!.length})</span>
          </h4>
        </button>
        {expanded && (
          <ul className="space-y-2 overflow-hidden">
            {comments!.map((comment) => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

const CommentItem = ({ author, timestamp, content }: Comment) => (
  <li className="bg-gray-50 p-3 rounded-lg">
    <div className="flex justify-between items-start">
      <span className="text-sm font-medium">{author}</span>
      <span className="text-xs text-gray-400">
        {new Date(timestamp).toLocaleDateString()}
      </span>
    </div>
    <p className="text-sm text-gray-600 mt-1">{content}</p>
  </li>
)

function Posts() {
  const { isLoading, error, posts } = usePosts()

  if (isLoading)
    return (
      <div className="h-9/10 flex justify-center items-center">
        <Spinner size="xl" aria-label="Extra large spinner example" />
      </div>
    )
  if (error)
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Error loading posts: {error}</span>
      </Alert>
    )

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-blue-600 flex justify-start items-center">
          <FaSailboat className="mr-2" />
          <span>Posts</span>
        </h2>
        <Link to="/posts/new" className="ml-auto text-sm transition-colors">
          <Button
            outline
            size="md"
            className="px-4 py-2 rounded-lg cursor-pointer text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            New Post
          </Button>
        </Link>
      </div>
      <ul className="mt-4 space-y-4">
        {posts.map(post => <PostItem key={post.id} {...post} /> )}
      </ul>
    </div>
  )
}

export default Posts
