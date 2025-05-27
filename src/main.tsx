import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { router } from './router'
import './index.css'

const isDevelopment = import.meta.env.APP_ENV === 'development'

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    {isDevelopment && <TanStackRouterDevtools router={router} />}
  </>
)
