import { DEFAULT_ITERATIONS, hashPassword, randomHex, verifyPassword } from './passwords.ts'
import seed from './seed.json'
import type { Storage } from './storage.ts'
import type {
  ApiFailure,
  Author,
  Course,
  CourseInput,
  Data,
  PublicUser,
  Role,
  StoredUser,
} from './types.ts'

/**
 * The courses backend, written from scratch: no framework, only the web platform's Request and
 * Response. The same `fetch` function is the Bun server's handler (server/main.ts) and the
 * backend that runs inside the browser on GitHub Pages (server/browser.ts).
 *
 * It answers like the backend of the course did, so the app's requests did not have to change:
 * every body has `successful`, the payload is in `result`, validation problems are in `errors`,
 * and a login returns `Bearer <token>`.
 */

export type ApiOptions = {
  storage: Storage
  /** How long a login lasts, in milliseconds. One day, as in the course's backend. */
  sessionLifetime?: number
  /** PBKDF2 rounds; the tests use fewer to stay fast. */
  passwordIterations?: number
  /** The clock, replaceable in tests. */
  now?: () => number
}

export type Api = {
  fetch(request: Request): Promise<Response>
  /** Forgets every change and starts again from the seed data. */
  reset(): Promise<void>
}

type Access = 'public' | 'user' | 'admin'

type Context = {
  db: Data
  params: Record<string, string>
  query: URLSearchParams
  body: unknown
  user: StoredUser | null
  token: string | null
}

type Reply = { status?: number; body: unknown }

type Route = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  access: Access
  summary: string
  handle(context: Context): Reply | Promise<Reply>
}

class HttpError extends Error {
  readonly status: number
  readonly body: ApiFailure

  constructor(status: number, body: ApiFailure) {
    super(body.result ?? body.errors?.join(' '))
    this.status = status
    this.body = body
  }
}

const fail = (status: number, result: string) =>
  new HttpError(status, { successful: false, result })
const invalid = (errors: string[]) => new HttpError(400, { successful: false, errors })

const ok = (result: unknown, status = 200): Reply => ({
  status,
  body: { successful: true, result },
})

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
  })

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const isText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

function asObject(body: unknown): Record<string, unknown> {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw invalid(['The body should be a JSON object.'])
  }
  return body as Record<string, unknown>
}

async function readBody(request: Request): Promise<unknown> {
  const text = await request.text()
  if (!text.trim()) return {}
  try {
    return JSON.parse(text)
  } catch {
    throw fail(400, 'The body is not valid JSON.')
  }
}

/** Matches `/courses/:id` against `/courses/42`; returns the path parameters or null. */
function matchPath(pattern: string, path: string): Record<string, string> | null {
  const wanted = pattern.split('/').filter(Boolean)
  const actual = path.split('/').filter(Boolean)
  if (wanted.length !== actual.length) return null
  const params: Record<string, string> = {}
  for (const [index, part] of wanted.entries()) {
    const value = actual[index] ?? ''
    if (part.startsWith(':')) params[part.slice(1)] = decodeURIComponent(value)
    else if (part !== value) return null
  }
  return params
}

const readToken = (request: Request) => {
  const header = request.headers.get('Authorization')?.trim()
  if (!header) return null
  return header.replace(/^Bearer\s+/i, '') || null
}

const toPublicUser = ({ id, name, email, role }: StoredUser): PublicUser => ({
  id,
  name,
  email,
  role,
})

/** For routes that need a login: the access check has already made sure there is a user. */
function signedIn(context: Context): StoredUser {
  if (!context.user) throw fail(401, 'Please log in first.')
  return context.user
}

/** Reads the fields of a course; `partial` (for updates) lets fields be left out. */
function readCourse(body: unknown, authors: Author[], partial: boolean): Partial<CourseInput> {
  const input = asObject(body)
  const errors: string[] = []
  const course: Partial<CourseInput> = {}
  const given = (key: keyof CourseInput) => !partial || input[key] !== undefined

  for (const key of ['title', 'description'] as const) {
    if (!given(key)) continue
    const value = input[key]
    if (isText(value)) course[key] = value.trim()
    else errors.push(value === undefined ? `'${key}' is missing.` : `'${key}' should be a text.`)
  }

  if (given('duration')) {
    const { duration } = input
    if (typeof duration === 'number' && Number.isInteger(duration) && duration > 0) {
      course.duration = duration
    } else {
      errors.push(
        duration === undefined
          ? "'duration' is missing."
          : "'duration' should be a whole number of minutes, at least 1.",
      )
    }
  }

  if (given('authors')) {
    const ids = input.authors
    if (!Array.isArray(ids) || ids.length === 0 || !ids.every(isText)) {
      errors.push(
        ids === undefined ? "'authors' is missing." : "'authors' should be a list of author ids.",
      )
    } else {
      const unknown = ids.filter((id) => !authors.some((author) => author.id === id))
      if (unknown.length) errors.push(`'authors' has unknown ids: ${unknown.join(', ')}.`)
      else course.authors = [...new Set(ids)]
    }
  }

  if (errors.length) throw invalid(errors)
  return course
}

function readAuthorName(body: unknown): string {
  const { name } = asObject(body)
  if (!isText(name) || name.trim().length < 2) {
    throw invalid(["'name' should be at least 2 characters long."])
  }
  return name.trim()
}

const today = (now: number) => new Date(now).toISOString().slice(0, 10)

export function createApi({
  storage,
  sessionLifetime = 24 * 60 * 60 * 1000,
  passwordIterations = DEFAULT_ITERATIONS,
  now = Date.now,
}: ApiOptions): Api {
  let loading: Promise<Data> | null = null

  async function seedData(): Promise<Data> {
    const users = await Promise.all(
      seed.users.map(async ({ password, role, ...user }): Promise<StoredUser> => {
        const { hash, salt } = await hashPassword(password, undefined, passwordIterations)
        return { id: crypto.randomUUID(), ...user, role: role as Role, passwordHash: hash, salt }
      }),
    )
    return {
      users,
      authors: structuredClone(seed.authors),
      courses: structuredClone(seed.courses),
      sessions: [],
    }
  }

  /** Loads the saved data once; the first start writes the seed data. */
  function getData(): Promise<Data> {
    loading ??= (async () => {
      const saved = await storage.load()
      if (saved) return saved
      const fresh = await seedData()
      await storage.save(fresh)
      return fresh
    })()
    return loading
  }

  function findUser(db: Data, token: string): StoredUser | null {
    const session = db.sessions.find((item) => item.token === token)
    if (!session || session.expiresAt <= now()) return null
    return db.users.find((user) => user.id === session.userId) ?? null
  }

  function findCourse(db: Data, id: string = ''): Course {
    const course = db.courses.find((item) => item.id === id)
    if (!course) throw fail(404, `Course ${id} was not found.`)
    return course
  }

  function findAuthor(db: Data, id: string = ''): Author {
    const author = db.authors.find((item) => item.id === id)
    if (!author) throw fail(404, `Author ${id} was not found.`)
    return author
  }

  const routes: Route[] = [
    {
      method: 'GET',
      path: '/',
      access: 'public',
      summary: 'This list of endpoints',
      handle: () =>
        ok({
          name: "Rika's courses API",
          endpoints: routes.map(({ method, path, access, summary }) => ({
            method,
            path,
            access,
            summary,
          })),
        }),
    },

    // Auth
    {
      method: 'POST',
      path: '/register',
      access: 'public',
      summary: 'Create a user: { name, email, password }',
      async handle({ db, body }) {
        const input = asObject(body)
        const errors: string[] = []
        const email = isText(input.email) ? input.email.trim().toLowerCase() : ''

        if (!isText(input.name)) errors.push("'name' is missing.")
        if (!EMAIL_PATTERN.test(email)) errors.push("'email' should be an email address.")
        else if (db.users.some((user) => user.email === email)) {
          errors.push('This email is already registered.')
        }
        if (typeof input.password !== 'string' || input.password.length < 6) {
          errors.push("'password' should be at least 6 characters long.")
        }
        if (errors.length) throw invalid(errors)

        const { hash, salt } = await hashPassword(
          input.password as string,
          undefined,
          passwordIterations,
        )
        db.users.push({
          id: crypto.randomUUID(),
          name: (input.name as string).trim(),
          email,
          role: 'user',
          passwordHash: hash,
          salt,
        })
        return ok('User was created.', 201)
      },
    },
    {
      method: 'POST',
      path: '/login',
      access: 'public',
      summary: 'Log in: { email, password } → "Bearer <token>"',
      async handle({ db, body }) {
        const { email, password } = asObject(body)
        const errors: string[] = []
        if (!isText(email)) errors.push("'email' is missing.")
        if (typeof password !== 'string' || !password) errors.push("'password' is missing.")
        if (errors.length) throw invalid(errors)

        const user = db.users.find((item) => item.email === (email as string).trim().toLowerCase())
        const valid =
          user &&
          (await verifyPassword(
            password as string,
            user.salt,
            user.passwordHash,
            passwordIterations,
          ))
        if (!user || !valid) throw fail(400, 'Invalid email or password.')

        const token = randomHex(32)
        db.sessions = db.sessions.filter((session) => session.expiresAt > now())
        db.sessions.push({ token, userId: user.id, expiresAt: now() + sessionLifetime })
        return {
          status: 201,
          body: {
            successful: true,
            result: `Bearer ${token}`,
            user: { name: user.name, email: user.email },
          },
        }
      },
    },
    {
      method: 'DELETE',
      path: '/logout',
      access: 'user',
      summary: 'Log out: the token stops working',
      handle({ db, token }) {
        db.sessions = db.sessions.filter((session) => session.token !== token)
        return ok('Logged out.')
      },
    },
    {
      method: 'GET',
      path: '/users/me',
      access: 'user',
      summary: 'The logged-in user, with the role',
      handle: (context) => ok(toPublicUser(signedIn(context))),
    },

    // Courses: the fixed paths come before /courses/:id
    {
      method: 'GET',
      path: '/courses/all',
      access: 'public',
      summary: 'Every course',
      handle: ({ db }) => ok(db.courses),
    },
    {
      method: 'GET',
      path: '/courses/filter',
      access: 'public',
      summary: 'Courses whose title, description, creationDate or duration contain the query',
      handle({ db, query }) {
        const filters = (['title', 'description', 'creationDate', 'duration'] as const).flatMap(
          (key) => {
            const values = (query.get(key) ?? '')
              .split(',')
              .map((value) => value.trim().toLowerCase())
              .filter(Boolean)
            return values.length ? [{ key, values }] : []
          },
        )
        return ok(
          db.courses.filter((course) =>
            filters.every(({ key, values }) =>
              values.some((value) => String(course[key]).toLowerCase().includes(value)),
            ),
          ),
        )
      },
    },
    {
      method: 'POST',
      path: '/courses/add',
      access: 'admin',
      summary: 'Add a course: { title, description, duration, authors }',
      handle({ db, body }) {
        const input = readCourse(body, db.authors, false) as CourseInput
        const course: Course = {
          id: crypto.randomUUID(),
          title: input.title,
          description: input.description,
          creationDate: today(now()),
          duration: input.duration,
          authors: input.authors,
        }
        db.courses.push(course)
        return ok(course, 201)
      },
    },
    {
      method: 'GET',
      path: '/courses/:id',
      access: 'public',
      summary: 'One course',
      handle: ({ db, params }) => ok(findCourse(db, params.id)),
    },
    {
      method: 'PUT',
      path: '/courses/:id',
      access: 'admin',
      summary: 'Change a course: any of { title, description, duration, authors }',
      handle({ db, params, body }) {
        const course = findCourse(db, params.id)
        Object.assign(course, readCourse(body, db.authors, true))
        return ok(course)
      },
    },
    {
      method: 'DELETE',
      path: '/courses/:id',
      access: 'admin',
      summary: 'Delete a course',
      handle({ db, params }) {
        const course = findCourse(db, params.id)
        db.courses = db.courses.filter((item) => item !== course)
        return ok('Course was deleted.')
      },
    },

    // Authors
    {
      method: 'GET',
      path: '/authors/all',
      access: 'public',
      summary: 'Every author',
      handle: ({ db }) => ok(db.authors),
    },
    {
      method: 'POST',
      path: '/authors/add',
      access: 'admin',
      summary: 'Add an author: { name }',
      handle({ db, body }) {
        const author: Author = { id: crypto.randomUUID(), name: readAuthorName(body) }
        db.authors.push(author)
        return ok(author, 201)
      },
    },
    {
      method: 'GET',
      path: '/authors/:id',
      access: 'public',
      summary: 'One author',
      handle: ({ db, params }) => ok(findAuthor(db, params.id)),
    },
    {
      method: 'PUT',
      path: '/authors/:id',
      access: 'admin',
      summary: 'Rename an author: { name }',
      handle({ db, params, body }) {
        const author = findAuthor(db, params.id)
        author.name = readAuthorName(body)
        return ok(author)
      },
    },
    {
      method: 'DELETE',
      path: '/authors/:id',
      access: 'admin',
      summary: 'Delete an author who is on no course',
      handle({ db, params }) {
        const author = findAuthor(db, params.id)
        if (db.courses.some((course) => course.authors.includes(author.id))) {
          throw fail(409, `${author.name} is still an author of a course.`)
        }
        db.authors = db.authors.filter((item) => item !== author)
        return ok('Author was deleted.')
      },
    },
  ]

  async function handle(request: Request): Promise<Response> {
    try {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS })
      }

      const path = new URL(request.url).pathname.replace(/\/+$/, '') || '/'
      let route: Route | undefined
      let params: Record<string, string> = {}
      let pathKnown = false
      for (const candidate of routes) {
        const found = matchPath(candidate.path, path)
        if (!found) continue
        pathKnown = true
        if (candidate.method === request.method) {
          route = candidate
          params = found
          break
        }
      }
      if (!route) throw pathKnown ? fail(405, 'Method not allowed.') : fail(404, 'Not found.')

      const db = await getData()
      const token = readToken(request)
      const user = token ? findUser(db, token) : null
      if (route.access !== 'public' && !user) throw fail(401, 'Please log in first.')
      if (route.access === 'admin' && user?.role !== 'admin') {
        throw fail(403, 'Only admins can do this.')
      }

      const body =
        request.method === 'POST' || request.method === 'PUT' ? await readBody(request) : undefined
      const reply = await route.handle({
        db,
        params,
        query: new URL(request.url).searchParams,
        body,
        user,
        token,
      })
      if (route.method !== 'GET') await storage.save(db)
      return json(reply.status ?? 200, reply.body)
    } catch (error) {
      if (error instanceof HttpError) return json(error.status, error.body)
      console.error(error)
      return json(500, { successful: false, result: 'Something went wrong.' })
    }
  }

  return {
    fetch: handle,
    async reset() {
      loading = null
      await storage.clear()
    },
  }
}
