import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router'
import type { Author, Course } from '../../server/types.ts'
import { routes } from '../routes.tsx'
import { makeStore, type RootState } from '../store/index.ts'
import type { UserState } from '../store/userSlice.ts'

export const authors: Author[] = [
  { id: 'a1', name: 'Natasha Romanova' },
  { id: 'a2', name: 'Diana Prince' },
  { id: 'a3', name: 'Tony Stark' },
]

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Zombie ipsum',
    description: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.',
    creationDate: '2010-10-31',
    duration: 120,
    authors: ['a1', 'a2'],
  },
  {
    id: 'c2',
    title: 'Cat Ipsum',
    description: 'Jump around on couch, meow constantly until given food.',
    creationDate: '2021-10-29',
    duration: 99,
    authors: ['a3'],
  },
]

export const admin: UserState = {
  isAuth: true,
  name: 'Admin',
  email: 'admin@email.com',
  token: 'Bearer test-token',
  role: 'admin',
  checking: false,
}

export const student: UserState = {
  ...admin,
  name: 'Student',
  email: 'user@email.com',
  role: 'user',
}

/** A store state with the two test courses and three authors, already loaded. */
export const loadedState = (
  user: UserState = admin,
  courseList: Course[] = courses,
): Partial<RootState> => ({
  user,
  courses: { items: courseList, status: 'ready', error: null },
  authors: { items: authors, status: 'ready' },
})

/** One component at `route`, inside a store and a router, without the Layout's start-up requests. */
export function renderWithStore(
  ui: ReactElement,
  {
    route = '/',
    path = '/',
    state = loadedState(),
  }: { route?: string; path?: string; state?: Partial<RootState> } = {},
) {
  const store = makeStore(state)
  const router = createMemoryRouter(
    [
      { path, element: ui },
      { path: '*', element: <p>Another page</p> },
    ],
    { initialEntries: [route] },
  )
  const user = userEvent.setup()
  const view = render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )
  return { ...view, store, router, user }
}

/** The whole app at `route`, talking to the test backend. */
export function renderApp(route = '/', state?: Partial<RootState>) {
  const store = makeStore(state)
  const router = createMemoryRouter(routes, { initialEntries: [route] })
  const user = userEvent.setup()
  const view = render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )
  return { ...view, store, router, user }
}
