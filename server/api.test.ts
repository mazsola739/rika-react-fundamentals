import { describe, expect, it } from 'vitest'
import { createApi } from './api.ts'
import { memoryStorage, type Storage } from './storage.ts'

const DAY = 24 * 60 * 60 * 1000

type Options = { body?: unknown; token?: string }

function setup(storage: Storage = memoryStorage()) {
  let time = Date.parse('2026-11-20T10:00:00Z')
  const api = createApi({ storage, passwordIterations: 1_000, now: () => time })

  async function call(method: string, path: string, { body, token }: Options = {}) {
    const headers: Record<string, string> = {}
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    if (token) headers.Authorization = token
    const response = await api.fetch(
      new Request(`http://api.test${path}`, {
        method,
        headers,
        body:
          body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
      }),
    )
    const text = await response.text()
    // biome-ignore lint/suspicious/noExplicitAny: the tests read whatever the API answered
    return { status: response.status, body: (text ? JSON.parse(text) : null) as any }
  }

  async function login(email = 'admin@email.com', password = 'admin123'): Promise<string> {
    const { body } = await call('POST', '/login', { body: { email, password } })
    return body.result
  }

  return { api, call, login, later: (ms: number) => (time += ms) }
}

const newCourse = (authors: string[]) => ({
  title: 'Unicorn ipsum',
  description: 'Rainbows, glitter and a horn of gold.',
  duration: 75,
  authors,
})

describe('the courses API', () => {
  it('lists its endpoints', async () => {
    const { call } = setup()
    const { status, body } = await call('GET', '/')
    expect(status).toBe(200)
    expect(body.result.endpoints).toContainEqual(
      expect.objectContaining({ method: 'POST', path: '/courses/add', access: 'admin' }),
    )
  })

  it('starts with my courses and authors from 2021', async () => {
    const { call } = setup()
    const courses = await call('GET', '/courses/all')
    const authors = await call('GET', '/authors/all')
    expect(courses.body.result.map((course: { title: string }) => course.title)).toEqual([
      'Zombie ipsum',
      'DeLorean Ipsum',
      'Cat Ipsum',
      'Hodor',
      'Far far away',
      'Cupcake ipsum',
    ])
    expect(authors.body.result).toHaveLength(13)
  })

  describe('login', () => {
    it('returns a Bearer token and the user', async () => {
      const { call } = setup()
      const { status, body } = await call('POST', '/login', {
        body: { email: 'Admin@Email.com ', password: 'admin123' },
      })
      expect(status).toBe(201)
      expect(body.result).toMatch(/^Bearer [0-9a-f]{64}$/)
      expect(body.user).toEqual({ name: 'Admin', email: 'admin@email.com' })
    })

    it('refuses a wrong password and missing fields', async () => {
      const { call } = setup()
      const wrong = await call('POST', '/login', {
        body: { email: 'admin@email.com', password: 'nope' },
      })
      expect(wrong.status).toBe(400)
      expect(wrong.body).toEqual({ successful: false, result: 'Invalid email or password.' })

      const empty = await call('POST', '/login', { body: {} })
      expect(empty.status).toBe(400)
      expect(empty.body.errors).toEqual(["'email' is missing.", "'password' is missing."])
    })
  })

  describe('users/me', () => {
    it('needs a token', async () => {
      const { call } = setup()
      expect((await call('GET', '/users/me')).status).toBe(401)
      expect((await call('GET', '/users/me', { token: 'Bearer made-up' })).status).toBe(401)
    })

    it('tells who is logged in, with the role and without the password', async () => {
      const { call, login } = setup()
      const { body } = await call('GET', '/users/me', { token: await login() })
      expect(body.result).toEqual({
        id: expect.any(String),
        name: 'Admin',
        email: 'admin@email.com',
        role: 'admin',
      })
    })
  })

  describe('register', () => {
    it('creates a user who can log in', async () => {
      const { call, login } = setup()
      const created = await call('POST', '/register', {
        body: { name: 'Rika', email: 'rika@email.com', password: 'rika123' },
      })
      expect(created).toEqual({
        status: 201,
        body: { successful: true, result: 'User was created.' },
      })
      const me = await call('GET', '/users/me', { token: await login('rika@email.com', 'rika123') })
      expect(me.body.result).toMatchObject({ name: 'Rika', role: 'user' })
    })

    it('checks every field and refuses a taken email', async () => {
      const { call } = setup()
      const bad = await call('POST', '/register', {
        body: { name: ' ', email: 'not-an-email', password: '123' },
      })
      expect(bad.status).toBe(400)
      expect(bad.body.errors).toEqual([
        "'name' is missing.",
        "'email' should be an email address.",
        "'password' should be at least 6 characters long.",
      ])

      const taken = await call('POST', '/register', {
        body: { name: 'Twin', email: 'USER@email.com', password: 'secret1' },
      })
      expect(taken.body.errors).toEqual(['This email is already registered.'])
    })
  })

  describe('courses', () => {
    it('lets only admins change them', async () => {
      const { call, login } = setup()
      const { body } = await call('GET', '/authors/all')
      const course = newCourse([body.result[0].id])

      expect((await call('POST', '/courses/add', { body: course })).status).toBe(401)
      const student = await login('user@email.com', 'user123')
      const forbidden = await call('POST', '/courses/add', { body: course, token: student })
      expect(forbidden).toEqual({
        status: 403,
        body: { successful: false, result: 'Only admins can do this.' },
      })
    })

    it('adds, reads, updates and deletes a course', async () => {
      const { call, login } = setup()
      const token = await login()
      const { body: authors } = await call('GET', '/authors/all')
      const ids = [authors.result[0].id, authors.result[1].id]

      const added = await call('POST', '/courses/add', { body: newCourse(ids), token })
      expect(added.status).toBe(201)
      expect(added.body.result).toEqual({
        id: expect.any(String),
        ...newCourse(ids),
        creationDate: '2026-11-20',
      })
      const { id } = added.body.result

      expect((await call('GET', `/courses/${id}`)).body.result.title).toBe('Unicorn ipsum')

      const updated = await call('PUT', `/courses/${id}`, { body: { duration: 90 }, token })
      expect(updated.body.result).toMatchObject({ title: 'Unicorn ipsum', duration: 90 })

      const deleted = await call('DELETE', `/courses/${id}`, { token })
      expect(deleted.body).toEqual({ successful: true, result: 'Course was deleted.' })
      expect((await call('GET', `/courses/${id}`)).status).toBe(404)
      expect((await call('DELETE', `/courses/${id}`, { token })).status).toBe(404)
    })

    it('checks the fields of a course', async () => {
      const { call, login } = setup()
      const token = await login()
      const missing = await call('POST', '/courses/add', { body: {}, token })
      expect(missing.body.errors).toEqual([
        "'title' is missing.",
        "'description' is missing.",
        "'duration' is missing.",
        "'authors' is missing.",
      ])

      const wrong = await call('POST', '/courses/add', {
        body: { title: 'Ok', description: 42, duration: 1.5, authors: ['nobody'] },
        token,
      })
      expect(wrong.body.errors).toEqual([
        "'description' should be a text.",
        "'duration' should be a whole number of minutes, at least 1.",
        "'authors' has unknown ids: nobody.",
      ])
    })

    it('filters by title or description', async () => {
      const { call } = setup()
      const { body } = await call('GET', '/courses/filter?title=ipsum&description=cat,zombie')
      expect(body.result.map((course: { title: string }) => course.title)).toEqual([
        'Zombie ipsum',
        'Cat Ipsum',
      ])
    })
  })

  describe('authors', () => {
    it('adds an author with a real name', async () => {
      const { call, login } = setup()
      const token = await login()
      const short = await call('POST', '/authors/add', { body: { name: 'R' }, token })
      expect(short.body.errors).toEqual(["'name' should be at least 2 characters long."])

      const added = await call('POST', '/authors/add', { body: { name: ' Rika ' }, token })
      expect(added.status).toBe(201)
      expect(added.body.result).toEqual({ id: expect.any(String), name: 'Rika' })
    })

    it('deletes an author only when no course needs them', async () => {
      const { call, login } = setup()
      const token = await login()
      const { body: courses } = await call('GET', '/courses/all')
      const busy = courses.result[0].authors[0]
      const refused = await call('DELETE', `/authors/${busy}`, { token })
      expect(refused.status).toBe(409)

      const { body: added } = await call('POST', '/authors/add', { body: { name: 'Free' }, token })
      const deleted = await call('DELETE', `/authors/${added.result.id}`, { token })
      expect(deleted.status).toBe(200)
    })
  })

  describe('sessions', () => {
    it('ends with logout', async () => {
      const { call, login } = setup()
      const token = await login()
      expect((await call('DELETE', '/logout', { token })).status).toBe(200)
      expect((await call('GET', '/users/me', { token })).status).toBe(401)
    })

    it('expire after a day', async () => {
      const { call, login, later } = setup()
      const token = await login()
      later(DAY - 1)
      expect((await call('GET', '/users/me', { token })).status).toBe(200)
      later(1)
      expect((await call('GET', '/users/me', { token })).status).toBe(401)
    })
  })

  describe('requests it does not understand', () => {
    it('answers 404, 405 and 400', async () => {
      const { call, login } = setup()
      expect((await call('GET', '/nothing/here')).status).toBe(404)
      expect((await call('PATCH', '/courses/all')).status).toBe(405)
      const broken = await call('POST', '/authors/add', { body: '{oops', token: await login() })
      expect(broken.body).toEqual({ successful: false, result: 'The body is not valid JSON.' })
    })

    it('allows calls from other origins', async () => {
      const { api } = setup()
      const response = await api.fetch(
        new Request('http://api.test/courses/all', { method: 'OPTIONS' }),
      )
      expect(response.status).toBe(204)
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
    })
  })

  describe('the data', () => {
    it('is kept in the storage, and a reset starts again from the seed', async () => {
      const storage = memoryStorage()
      const first = setup(storage)
      const token = await first.login()
      await first.call('POST', '/authors/add', { body: { name: 'Remembered' }, token })

      const second = setup(storage)
      const { body } = await second.call('GET', '/authors/all')
      expect(body.result.at(-1).name).toBe('Remembered')

      await second.api.reset()
      expect((await second.call('GET', '/authors/all')).body.result).toHaveLength(13)
    })
  })
})
