import type { Comment } from '../../data/posts'
import type { ActionResult } from './createPostAction'
import type { CreateCommentFormInputs } from './CreateCommentForm'

async function createCommentAction(comment: CreateCommentFormInputs): Promise<ActionResult> {
  const commentToAdd: Comment = {
    id: Math.random().toString(),
    postId: comment.postId,
    author: comment.author,
    content: comment.content,
    timestamp: new Date().toISOString(),
  }
  console.log(commentToAdd)

  const res = await fetch('http://localhost:3000/comments', {
    method: 'POST',
    body: JSON.stringify(commentToAdd),
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
    message: `Comment with id (${commentToAdd.id}) was added successfully`,
    success: true,
  }
}

export default createCommentAction
