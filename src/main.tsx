import '@fontsource-variable/roboto'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createHashRouter, RouterProvider } from 'react-router'
import { routes } from './routes.tsx'
import { makeStore } from './store/index.ts'

const store = makeStore()

// Hash routing: GitHub Pages serves only index.html, so /#/courses/add works on a reload too.
const router = createHashRouter(routes)

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
