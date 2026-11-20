import type { Data } from './types.ts'

/**
 * Where the backend keeps its data between requests. The API itself does not care:
 * the Bun server writes a JSON file, the browser version uses localStorage, the tests keep it in memory.
 */
export type Storage = {
  load(): Data | null | Promise<Data | null>
  save(data: Data): void | Promise<void>
  clear(): void | Promise<void>
}

export function memoryStorage(): Storage {
  let saved: Data | null = null
  return {
    load: () => (saved ? structuredClone(saved) : null),
    save: (data) => {
      saved = structuredClone(data)
    },
    clear: () => {
      saved = null
    },
  }
}

/** localStorage, under a key of its own: every project page on mazsola739.github.io shares one localStorage. */
export function localStorageStorage(key: string): Storage {
  return {
    load: () => {
      try {
        const text = localStorage.getItem(key)
        return text ? (JSON.parse(text) as Data) : null
      } catch {
        return null
      }
    },
    save: (data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data))
      } catch {
        // Private mode or full storage: the data lives until the page is closed.
      }
    },
    clear: () => {
      try {
        localStorage.removeItem(key)
      } catch {
        // Nothing to clear.
      }
    },
  }
}
