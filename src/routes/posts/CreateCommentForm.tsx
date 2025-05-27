import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Alert } from 'flowbite-react/components/Alert'
import { TextInput } from 'flowbite-react/components/TextInput'
import { Textarea } from 'flowbite-react/components/Textarea'
import { Button } from 'flowbite-react/components/Button'

import { HiInformationCircle } from 'react-icons/hi'


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
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-stretch gap-1">
        <TextInput id="author" type="hidden" {...register('postId')} />
        <TextInput
          id="author"
          type="text"
          placeholder="type your name"
          sizing="lg"
          {...register('author')}
        />
        <Textarea
          id="content"
          className="flex-1/2"
          placeholder="type your content"
          rows={1}
          {...register('content')}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding the new comment ...' : 'Add Comment'}
        </Button>
      </div>
      <div className="flex gap-1">
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
