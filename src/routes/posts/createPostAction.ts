import { nanoid } from 'nanoid'

import type { CreatePostFormInputs } from './CreatePostForm'
import type { Post } from '../../data/posts'

export type ActionResult = {
  message: string
  success: boolean
}

async function createPostAction(post: CreatePostFormInputs): Promise<ActionResult> {
  const postToAdd: Post = {
    id: nanoid(12),
    title: post.title,
    content: post.content,
    timestamp: new Date().toISOString(),
  }
  console.log(postToAdd)

  const res = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(postToAdd),
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
    message: `Post with id (${postToAdd.id}) was added successfully`,
    success: true,
  }
}

export default createPostAction
