import '@testing-library/jest-dom'
import { vi } from 'vitest'

/** Mock next/navigation */
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

/** Mock next-intl */
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string | any) =>
    typeof key === 'string' ? key : key?.defaultValue || '',
  useTimeZone: () => 'UTC',
  useMessages: () => ({}),
}))

/** Mock i18n routing */
vi.mock('@/i18n/routing', () => ({
  Link: ({ children }: any) => children,
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}))

/** Mock ResizeObserver */
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

/** Mock framer-motion */
vi.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: Object.assign((Component: any) => Component, {
      div: (props: any) => React.createElement('div', props),
      span: (props: any) => React.createElement('span', props),
      button: (props: any) => React.createElement('button', props),
    }),
    AnimatePresence: ({ children }: any) => children,
  }
})
