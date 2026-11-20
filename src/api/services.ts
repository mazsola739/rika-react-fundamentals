import type {
  ApiSuccess,
  Author,
  Course,
  CourseInput,
  LoginResult,
  PublicUser,
} from '../../server/types.ts'
import { request } from './client.ts'

/** Every call to the backend, in one place (the course asked for a services.js). */

export type Credentials = { email: string; password: string }
export type NewUser = Credentials & { name: string }

export const services = {
  login: (credentials: Credentials) =>
    request<LoginResult>('/login', { method: 'POST', body: credentials }),

  register: (user: NewUser) =>
    request<ApiSuccess<string>>('/register', { method: 'POST', body: user }),

  logout: (token: string) => request<ApiSuccess<string>>('/logout', { method: 'DELETE', token }),

  me: async (token: string) =>
    (await request<ApiSuccess<PublicUser>>('/users/me', { token })).result,

  getCourses: async () => (await request<ApiSuccess<Course[]>>('/courses/all')).result,

  addCourse: async (course: CourseInput, token: string) =>
    (await request<ApiSuccess<Course>>('/courses/add', { method: 'POST', body: course, token }))
      .result,

  updateCourse: async (id: string, course: CourseInput, token: string) =>
    (await request<ApiSuccess<Course>>(`/courses/${id}`, { method: 'PUT', body: course, token }))
      .result,

  deleteCourse: (id: string, token: string) =>
    request<ApiSuccess<string>>(`/courses/${id}`, { method: 'DELETE', token }),

  getAuthors: async () => (await request<ApiSuccess<Author[]>>('/authors/all')).result,

  addAuthor: async (name: string, token: string) =>
    (await request<ApiSuccess<Author>>('/authors/add', { method: 'POST', body: { name }, token }))
      .result,
}
