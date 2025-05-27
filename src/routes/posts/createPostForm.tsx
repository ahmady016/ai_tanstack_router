import React from 'react'

import z from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextInput } from 'flowbite-react/components/TextInput'
import { Textarea } from 'flowbite-react/components/Textarea'
import { Button } from 'flowbite-react/components/Button'
import { Alert } from 'flowbite-react/components/Alert'

import { GoCheck } from 'react-icons/go'
import { HiInformationCircle } from 'react-icons/hi'

import createPostAction, { type createPostActionResult } from './createPostAction'

import { createRoute } from '@tanstack/react-router'
import { postsRoute } from '.'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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
  const [result, setResult] = React.useState<createPostActionResult | undefined>(undefined)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormInputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<CreatePostFormInputs> = async (data) => {
    console.log(data)
    setResult(undefined)

    await sleep(2000)
    const result = await createPostAction(data)
    setResult(result)
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
        {isSubmitting ? 'Creating the new post ...' : 'Create New Post'}
      </Button>
      {result 
        ? result.success
          ? <Alert color="success" icon={HiInformationCircle}>{result.message}</Alert>
          : <Alert color="failure" icon={GoCheck}>{result.message}</Alert>
        : null
      }
    </form>
  )
}

export default createPostForm
