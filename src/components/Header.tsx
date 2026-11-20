import { Link, NavLink, useNavigate } from 'react-router'
import { Button } from '../common/Button.tsx'
import { LaptopIcon } from '../common/icons.tsx'
import { selectUser, useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { logout } from '../store/userSlice.ts'
import { ThemeToggle } from './ThemeToggle.tsx'

/** The logo of 2021: Font Awesome's laptop and the word Courses. */
export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-3xl font-medium">
      <LaptopIcon className="text-4xl" />
      Courses
    </Link>
  )
}

/** Logo, the logged-in user's name and Logout; the theme switch is my 2026 addition. */
export function Header() {
  const { isAuth, name, email } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogout = async () => {
    await dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-sm border border-line bg-tint px-4 py-3 text-accent">
      <Logo />
      <nav aria-label="Main" className="ml-auto flex flex-wrap items-center gap-2">
        <NavLink
          to="/about"
          className="rounded-sm px-3 py-1.5 hover:bg-bar aria-[current=page]:font-semibold"
        >
          About
        </NavLink>
        {isAuth && (
          <>
            <span className="rounded-sm bg-bar px-3 py-1.5 font-medium" title={email}>
              {name || email}
            </span>
            <Button onClick={onLogout}>Logout</Button>
          </>
        )}
        <ThemeToggle />
      </nav>
    </header>
  )
}
