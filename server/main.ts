import { mkdir } from 'node:fs/promises'
import { createApi } from './api.ts'
import type { Storage } from './storage.ts'
import type { Data } from './types.ts'

/**
 * The backend as a real server: `bun run server`, then http://localhost:4000 lists the endpoints.
 * The data is written to server/data/db.json; delete the file to start again from the seed data.
 */

const PORT = Number(process.env.PORT ?? 4000)
const DATA_FILE = new URL('./data/db.json', import.meta.url)

const fileStorage: Storage = {
  async load() {
    const file = Bun.file(DATA_FILE)
    return (await file.exists()) ? ((await file.json()) as Data) : null
  },
  async save(data) {
    await mkdir(new URL('./data/', import.meta.url), { recursive: true })
    await Bun.write(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`)
  },
  async clear() {
    await Bun.file(DATA_FILE).delete()
  },
}

const api = createApi({ storage: fileStorage })

const server = Bun.serve({
  port: PORT,
  async fetch(request) {
    const started = performance.now()
    const response = await api.fetch(request)
    const time = (performance.now() - started).toFixed(1)
    console.log(
      `${request.method} ${new URL(request.url).pathname} → ${response.status} (${time} ms)`,
    )
    return response
  },
})

console.log(`Courses API on ${server.url}`)
