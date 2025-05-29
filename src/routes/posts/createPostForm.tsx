import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Swal from 'sweetalert2'

import { Spinner } from 'flowbite-react/components/Spinner'
import { Alert } from 'flowbite-react/components/Alert'

import { TextInput } from 'flowbite-react/components/TextInput'
import { Textarea } from 'flowbite-react/components/Textarea'
import { Button } from 'flowbite-react/components/Button'

import { HiInformationCircle } from 'react-icons/hi'

import createPostAction from './createPostAction'
import sleep from '../../utils/sleep'

import { createRoute } from '@tanstack/react-router'
import { postsRoute } from './Posts'


export const createPostRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '/new',
  component: createPostForm,
})

const schema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(8).max(500),
})

export type CreatePostFormInputs = z.infer<typeof schema>

function createPostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormInputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: CreatePostFormInputs) => {
    console.log(data)
    await sleep(2000)
    const result = await createPostAction(data)
    Swal.fire({
      title: 'New Post Creation Status',
      text: result.message,
      icon: result.success ? 'success' : 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    })
  }

  return (
    <form
      className="max-w-4xl m-auto flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Create New Post</h2>
      <div>
        <TextInput
          id="title"
          type="text"
          placeholder="type your title"
          sizing="lg"
          {...register('title')}
        />
        {errors.title && (
          <Alert color="failure" icon={HiInformationCircle}>
            {errors.title.message}
          </Alert>
        )}
      </div>
      <div>
        <Textarea
          id="content"
          placeholder="type your content"
          rows={4}
          {...register('content')}
        />
        {errors.content && (
          <Alert color="failure" icon={HiInformationCircle}>
            {errors.content.message}
          </Alert>
        )}
      </div>
      <Button type="submit" className="cursor-pointer" size="lg" disabled={isSubmitting}>
        {isSubmitting
          ? <>
              <Spinner size="sm"  className="me-3" light aria-label="loading state" />
              <span>Creating the new post ...</span>
            </>
          : <span>Create New Post</span>
        }
      </Button>
    </form>
  )
}

export default createPostForm
