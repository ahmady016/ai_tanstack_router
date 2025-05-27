import { createRouter } from '@tanstack/react-router'

import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { aboutRoute } from './routes/about'

import { postsRoute, postsIndexRoute } from './routes/posts'
import { postDetailsRoute } from './routes/posts/postDetails'
import { createPostRoute } from './routes/posts/createPostForm'

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
