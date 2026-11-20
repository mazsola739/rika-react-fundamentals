/** The data the backend keeps, and the shapes its endpoints send and receive. */

export type Role = 'admin' | 'user'

export type Author = {
  id: string
  name: string
}

export type Course = {
  id: string
  title: string
  description: string
  /** ISO date, e.g. 2021-10-29. */
  creationDate: string
  /** In minutes. */
  duration: number
  /** Author ids. */
  authors: string[]
}

/** A user as the API shows it: never with the password. */
export type PublicUser = {
  id: string
  name: string
  email: string
  role: Role
}

export type StoredUser = PublicUser & {
  /** PBKDF2-SHA-256 of the password, hex. */
  passwordHash: string
  salt: string
}

export type Session = {
  token: string
  userId: string
  /** Epoch milliseconds. */
  expiresAt: number
}

export type Data = {
  users: StoredUser[]
  authors: Author[]
  courses: Course[]
  sessions: Session[]
}

/** Every response body has `successful`; the payload is in `result`, validation problems in `errors`. */
export type ApiSuccess<T> = { successful: true; result: T }
export type ApiFailure = { successful: false; result?: string; errors?: string[] }

export type LoginResult = ApiSuccess<string> & { user: { name: string; email: string } }

export type CourseInput = Omit<Course, 'id' | 'creationDate'>
