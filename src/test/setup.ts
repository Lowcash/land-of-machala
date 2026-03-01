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
  
  const mockMotion = (Component: any) => Component
  
  // Helper to create mocked motion components that handle refs
  const createMotionComponent = (tag: string) => {
    return React.forwardRef((props: any, ref: any) => 
      React.createElement(tag, { ...props, ref })
    )
  }

  return {
    motion: Object.assign(mockMotion, {
      div: createMotionComponent('div'),
      span: createMotionComponent('span'),
      button: createMotionComponent('button'),
      p: createMotionComponent('p'),
      section: createMotionComponent('section'),
      nav: createMotionComponent('nav'),
      ul: createMotionComponent('ul'),
      li: createMotionComponent('li'),
    }),
    AnimatePresence: ({ children }: any) => children,
    animate: vi.fn().mockImplementation(() => Promise.resolve()),
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
    }),
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: () => () => {} } }),
  }
})
