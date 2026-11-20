import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { createApi } from '../../server/api.ts'
import { memoryStorage } from '../../server/storage.ts'
import { setBrowserApi } from '../api/client.ts'

// Every test gets a fresh backend with the seed data in memory (and fast password hashing).
beforeEach(() => {
  setBrowserApi(createApi({ storage: memoryStorage(), passwordIterations: 1_000 }))
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  setBrowserApi(null)
  document.documentElement.dataset.theme = 'light'
})
