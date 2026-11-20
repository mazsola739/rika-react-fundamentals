import { type ReactNode, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { Loading } from '../common/ui.tsx'
import { fetchAuthors } from '../store/authorsSlice.ts'
import { fetchCourses } from '../store/coursesSlice.ts'
import { selectIsAdmin, selectUser, useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { fetchCurrentUser } from '../store/userSlice.ts'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'

/** Header, page, footer; loads the courses and the authors, and checks a saved login. */
export function Layout() {
  const dispatch = useAppDispatch()
  const { checking } = useAppSelector(selectUser)

  // biome-ignore lint/correctness/useExhaustiveDependencies: only once, at start-up
  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchAuthors())
    if (checking) dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col p-4 sm:py-6">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const CHECKING = 'Checking your login…'

/** `/`: the courses for a logged-in user, the login page for everyone else. */
export function Home() {
  const { isAuth, checking } = useAppSelector(selectUser)
  if (checking) return <Loading>{CHECKING}</Loading>
  return <Navigate replace to={isAuth ? '/courses' : '/login'} />
}

/** Pages for logged-in users: the others go to the login page, and come back after it. */
export function RequireAuth() {
  const { isAuth, checking } = useAppSelector(selectUser)
  const location = useLocation()
  if (checking) return <Loading>{CHECKING}</Loading>
  if (!isAuth) return <Navigate replace to="/login" state={{ from: location.pathname }} />
  return <Outlet />
}

/** The course's PrivateRoute: adding and updating courses is for admins only. */
export function PrivateRoute() {
  const isAdmin = useAppSelector(selectIsAdmin)
  return isAdmin ? <Outlet /> : <Navigate replace to="/courses" />
}

/** Login and registration: a logged-in user is sent on to the courses. */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { isAuth, checking } = useAppSelector(selectUser)
  const location = useLocation()
  if (checking) return <Loading>{CHECKING}</Loading>
  if (isAuth) {
    const from = (location.state as { from?: string } | null)?.from
    return <Navigate replace to={from ?? '/courses'} />
  }
  return children
}
