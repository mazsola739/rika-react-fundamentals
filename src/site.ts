/** My portfolio, which lists this project among my junior projects. */
export const PORTFOLIO_URL = 'https://mazsola739.github.io/mazsola739/'

/** Source code of this site on GitHub. */
export const REPO_URL = 'https://github.com/mazsola739/rika-react-fundamentals'

/** One of the course's task sheets in the repository (course-tasks/). */
export const taskSheetUrl = (file: string) => `${REPO_URL}/blob/main/course-tasks/${file}`

/** The Bun server of `bun run server`, when the app runs with `bun run dev:server`. */
export const SERVER_URL: string | undefined = import.meta.env.VITE_API_URL || undefined

/** The accounts of the seed data, shown on the login page. */
export const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@email.com', password: 'admin123', can: 'add, edit and delete' },
  { label: 'Student', email: 'user@email.com', password: 'user123', can: 'browse and search' },
] as const
