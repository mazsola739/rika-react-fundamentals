import type { Api } from '../../server/api.ts'
import { createBrowserApi } from '../../server/browser.ts'
import { SERVER_URL } from '../site.ts'

/**
 * Sends a request to the backend: to the Bun server when VITE_API_URL is set (bun run dev:server),
 * otherwise to the same backend running in the browser (the live site on GitHub Pages).
 */

let browserApi: Api | null = null

export const getBrowserApi = (): Api => {
  browserApi ??= createBrowserApi()
  return browserApi
}

/** The tests give every case a backend of its own, with the data in memory. */
export function setBrowserApi(api: Api | null) {
  browserApi = api
}

export class ApiError extends Error {
  readonly status: number
  /** The validation problems the backend listed, e.g. for a registration. */
  readonly errors: string[]

  constructor(message: string, status: number, errors: string[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

type Options = { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: unknown; token?: string }

export async function request<T>(path: string, { method = 'GET', body, token }: Options = {}) {
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = token
  const init: RequestInit = {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  }

  let response: Response
  try {
    response = SERVER_URL
      ? await fetch(`${SERVER_URL}${path}`, init)
      : await getBrowserApi().fetch(new Request(`https://courses.api${path}`, init))
  } catch {
    throw new ApiError('The server cannot be reached.', 0)
  }

  const payload = await response.json().catch(() => null)
  if (!response.ok || payload?.successful !== true) {
    const errors: string[] = Array.isArray(payload?.errors) ? payload.errors : []
    const message =
      typeof payload?.result === 'string'
        ? payload.result
        : errors.join(' ') || `The request failed (${response.status}).`
    throw new ApiError(message, response.status, errors)
  }
  return payload as T
}
