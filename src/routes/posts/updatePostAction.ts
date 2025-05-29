import type { PostWithoutComments } from '../../data/posts'

export type ActionResult = {
  message: string
  success: boolean
}

async function updatePostAction(updatedPost: PostWithoutComments): Promise<ActionResult> {

  const res = await fetch(`http://localhost:3000/posts/${updatedPost.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPost),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!res.ok)
    return {
      message: 'Failed to create post',
      success: false,
    }
  return {
    message: `Post with id (${updatedPost.id}) was added successfully`,
    success: true,
  }
}

export default updatePostAction
