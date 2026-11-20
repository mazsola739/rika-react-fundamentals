/** My portfolio, which lists this project among my junior projects. */
export const PORTFOLIO_URL = 'https://mazsola739.github.io/mazsola739/'

/** Source code of this site on GitHub. */
export const REPO_URL = 'https://github.com/mazsola739/rika-react-fundamentals'

/** The same courses app from EPAM's Angular Fundamentals course, on the same backend. */
export const ANGULAR_APP_URL = 'https://mazsola739.github.io/rika-angular-fundamentals/'

/** The Bun server of `bun run server`, when the app runs with `bun run dev:server`. */
export const SERVER_URL: string | undefined = import.meta.env.VITE_API_URL || undefined

/** The accounts of the seed data, shown on the login page. */
export const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@email.com', password: 'admin123', can: 'add, edit and delete' },
  { label: 'Student', email: 'user@email.com', password: 'user123', can: 'browse and search' },
] as const
