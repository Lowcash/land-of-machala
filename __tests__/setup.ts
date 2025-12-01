import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock next/cache
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...(actual as object),
    cache: (fn: Function) => fn,
  }
})

// Mock server-only
vi.mock('server-only', () => ({}))

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  default: {
    t: (key: string) => key,
  },
}))

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})
