import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Swal from 'sweetalert2'

import { Alert } from 'flowbite-react/components/Alert'
import { Spinner } from 'flowbite-react/components/Spinner'

import { TextInput } from 'flowbite-react/components/TextInput'
import { Textarea } from 'flowbite-react/components/Textarea'
import { Button } from 'flowbite-react/components/Button'

import { HiInformationCircle } from 'react-icons/hi'

import createCommentAction from './createCommentAction'
import sleep from '../../utils/sleep'

const schema = z.object({
  postId: z.string(),
  author: z.string().min(5).max(50),
  content: z.string().min(8).max(500),
})
export type CreateCommentFormInputs = z.infer<typeof schema>

type CreateCommentFormProps = {
  postId: string
}
const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ postId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { postId, author: '', content: '' },
  })

  const onSubmit = async (data: CreateCommentFormInputs) => {
    console.log(data)
    await sleep(2000)
    const result = await createCommentAction(data)
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
    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 flex justify-between items-stretch gap-1">
        <TextInput id="author" type="hidden" {...register('postId')} />
        <TextInput
          id="author"
          type="text"
          className="flex-3/12"
          placeholder="type your name"
          sizing="lg"
          {...register('author')}
        />
        <Textarea
          id="content"
          className="flex-7/12"
          placeholder="type your content"
          rows={1}
          {...register('content')}
        />
        <Button
          type="submit"
          className="cursor-pointer flex-2/12"
          size="2xl"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? <>
                <Spinner size="sm"  className="me-3" light aria-label="loading state" />
                <span>Adding the new comment ...</span>
              </>
            : <span>Add Comment</span>
          }
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {errors.author && (
          <Alert color="failure" icon={HiInformationCircle}>
            Author {errors.author.message}
          </Alert>
        )}
        {errors.content && (
          <Alert color="failure" icon={HiInformationCircle}>
            Content {errors.content.message}
          </Alert>
        )}
      </div>
    </form>
  )
}

export default CreateCommentForm
