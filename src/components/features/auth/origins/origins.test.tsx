import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

/** Mock next/navigation for next-intl compatibility */
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

/** Mock next-intl/navigation as it's used in i18n/routing.ts */
vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ children }: any) => <>{children}</>,
    redirect: vi.fn(),
    usePathname: () => '/',
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
    getPathname: () => '/',
  }),
}))

/** Mock next-intl */
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string | any) => (typeof key === 'string' ? key : key?.defaultValue || ''),
  useTimeZone: () => 'UTC',
  useMessages: () => ({}),
}))

/** Mock framer-motion to avoid animation issues in tests */
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

import { OriginsView } from './view'

describe('OriginsView Integration', () => {
  it('renders initial tutorial phase', () => {
    // We expect the view to start in tutorial phase based on useOrigins default
    render(<OriginsView />)
    
    // Check for tutorial elements (mocked translation will just return the key)
    // We look for parts of the tutorial step text keys or icons if they were testable
    // NarrativeText uses the key in our mock
    expect(screen.getByTestId('fade-in')).toBeInTheDocument()
  })
})
