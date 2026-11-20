import type { RouteObject } from 'react-router'
import { About } from './components/About.tsx'
import { CourseFormPage } from './components/CourseForm.tsx'
import { CourseInfo } from './components/CourseInfo.tsx'
import { Courses } from './components/Courses.tsx'
import { GuestOnly, Home, Layout, PrivateRoute, RequireAuth } from './components/Layout.tsx'
import { Login } from './components/Login.tsx'
import { NotFound } from './components/NotFound.tsx'
import { Registration } from './components/Registration.tsx'

/** The routes of the course, plus an About page and a 404 page. */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'login',
        element: (
          <GuestOnly>
            <Login />
          </GuestOnly>
        ),
      },
      {
        path: 'registration',
        element: (
          <GuestOnly>
            <Registration />
          </GuestOnly>
        ),
      },
      { path: 'about', element: <About /> },
      {
        element: <RequireAuth />,
        children: [
          { path: 'courses', element: <Courses /> },
          { path: 'courses/:courseId', element: <CourseInfo /> },
          {
            element: <PrivateRoute />,
            children: [
              { path: 'courses/add', element: <CourseFormPage /> },
              { path: 'courses/update/:courseId', element: <CourseFormPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]
