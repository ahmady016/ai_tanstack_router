import React from 'react'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Swal from 'sweetalert2'

import { Alert } from 'flowbite-react/components/Alert'
import { Spinner } from 'flowbite-react/components/Spinner'

import { TextInput } from 'flowbite-react/components/TextInput'
import { Textarea } from 'flowbite-react/components/Textarea'
import { Button } from 'flowbite-react/components/Button'

import { HiInformationCircle, HiOutlinePencil } from 'react-icons/hi'

import sleep from '../../utils/sleep'
import { usePost } from './usePost'
import { type Comment, type Post } from '../../data/posts'
import updatePostAction from './updatePostAction'

import { createRoute } from '@tanstack/react-router'
import { postsRoute } from './Posts'

import CreateCommentForm from './CreateCommentForm'

const ViewPost: React.FC<Post> = ({ title, content }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{content}</p>
    </div>
  )
}

type EditPostProps = {
  post: Post
  toggleEditMode: () => void
}
const EditPost: React.FC<EditPostProps> = ({ post, toggleEditMode }) => {
  delete post.comments

  const schema = z.object({
    title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
    content: z.string().min(10, { message: 'Content must be at least 10 characters long' }),
  })
  type EditPostFormInputs = z.infer<typeof schema>
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: post.title, content: post.content },
  })
  const onSubmit = async (data: EditPostFormInputs) => {
    console.log(data)
    await sleep(2000)

    const result = await updatePostAction({ ...post, ...data })
    Swal.fire({
      title: 'Update Post Status',
      text: result.message,
      icon: result.success ? 'success' : 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
    })
  }
  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="title"
        type="text"
        placeholder="type post title"
        defaultValue={post.title}
        {...register('title')}
      />
      {errors.title && (
        <Alert color="failure" icon={HiInformationCircle}>
          {errors.title.message}
        </Alert>
      )}
      <Textarea
        id="content"
        rows={4}
        placeholder="type post content"
        defaultValue={post.content}
        {...register('content')}
      />
      {errors.content && (
        <Alert color="failure" icon={HiInformationCircle}>
          {errors.content.message}
        </Alert>
      )}
      <div className="flex items-center gap-6">
        <Button type="submit" size="lg" color="default" className="cursor-pointer">
        {isSubmitting
          ? <>
              <Spinner size="sm"  className="me-3" light aria-label="loading state" />
              <span>Updating the new post ...</span>
            </>
          : <span>Update New Post</span>
        }
        </Button>
        <Button type="button" size="lg" color="red" className="cursor-pointer" onClick={toggleEditMode}>
          Cancel Edit
        </Button>
      </div>
    </form>
  )
}

export const postDetailsRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '/$postId',
  params: {
    parse: (rawParams) => {
      const postId = Number(rawParams.postId)
      return { postId: isNaN(postId) ? 0 : postId }
    },
  },
  component: PostDetails,
})

function PostDetails() {
  const { postId } = postDetailsRoute.useParams()
  const { isLoading, error, post } = usePost(postId)

  const [editMode, setEditMode] = React.useState(false)
  const toggleEditMode = React.useCallback(() => void setEditMode(editMode => !editMode), [])

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
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">POST NOT FOUND</span>
      </Alert>
    )

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative">
      <div className="absolute top-12 right-8">
        <HiOutlinePencil className="text-2xl cursor-pointer" onClick={toggleEditMode} />
      </div>
      {editMode
        ? <EditPost post={post} toggleEditMode={toggleEditMode} />
        : <ViewPost {...post} />
      }
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        <CreateCommentForm postId={post.id} />
        {post.comments?.map((comment: Comment) => (
          <div key={comment.id} className="mb-4 p-4 bg-gray-50 rounded">
            <p className="font-medium text-gray-700">{comment.author}</p>
            <p className="text-gray-500">{comment.content}</p>
          </div>
        )) ?? <p className="text-gray-500">No comments yet</p>}
      </div>
    </div>
  )
}

export default postDetailsRoute
