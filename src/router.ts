import { createRouter } from '@tanstack/react-router'

import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { aboutRoute } from './routes/about'

import { postsRoute, postsIndexRoute } from './routes/posts/Posts'
import { postDetailsRoute } from './routes/posts/PostDetails'
import { createPostRoute } from './routes/posts/CreatePostForm'

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  postsRoute.addChildren([postsIndexRoute, postDetailsRoute, createPostRoute])
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
