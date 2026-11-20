import { Link, useNavigate } from 'react-router'
import { getBrowserApi } from '../api/client.ts'
import { ExternalLink } from '../common/ExternalLink.tsx'
import { ANGULAR_APP_URL, PORTFOLIO_URL, REPO_URL, SERVER_URL } from '../site.ts'
import { fetchAuthors } from '../store/authorsSlice.ts'
import { fetchCourses } from '../store/coursesSlice.ts'
import { useAppDispatch } from '../store/hooks.ts'
import { loggedOut, saveToken } from '../store/userSlice.ts'

const linkClass = 'underline-offset-2 hover:text-accent hover:underline'

export function Footer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  /** Every visitor has their own data in localStorage; this brings back the courses of 2021. */
  const resetData = async () => {
    await getBrowserApi().reset()
    saveToken('')
    dispatch(loggedOut())
    dispatch(fetchCourses())
    dispatch(fetchAuthors())
    navigate('/login', { replace: true })
  }

  return (
    <footer className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line/30 pt-4 text-sm text-muted">
      <p>EPAM React Fundamentals homework, 2021 · renovated in 2026</p>
      <nav aria-label="Project" className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Link to="/about" className={linkClass}>
          About
        </Link>
        <ExternalLink href={REPO_URL} className={linkClass}>
          Code
        </ExternalLink>
        <ExternalLink href={ANGULAR_APP_URL} className={linkClass}>
          Angular version
        </ExternalLink>
        <ExternalLink href={PORTFOLIO_URL} className={linkClass}>
          Portfolio
        </ExternalLink>
        {!SERVER_URL && (
          <button type="button" onClick={resetData} className={`cursor-pointer ${linkClass}`}>
            Reset demo data
          </button>
        )}
      </nav>
    </footer>
  )
}
