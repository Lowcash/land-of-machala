import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RegisterViewUI } from './view'
import type { RegisterUiLabels } from './types'

/** Mock next/navigation */
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

/** Mock next-intl/navigation */
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
  useTranslations: () => (key: string | any) =>
    typeof key === 'string' ? key : key?.defaultValue || '',
  useTimeZone: () => 'UTC',
  useMessages: () => ({}),
}))

/** Mock i18n routing */
vi.mock('@/i18n/routing', () => ({
  Link: ({ children }: any) => <>{children}</>,
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}))

/** Mock framer-motion */
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

/** Mock ResizeObserver */
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

const MOCK_PROPS = {
  hero: {
    title: 'Land of Machala',
    subtitle: 'Epic RPG',
    description: 'Adventure awaits',
  },
  footerLinks: {
    hasAccount: 'Already have an account?',
    login: 'Log in',
  },
  accordion: {
    benefitsTitle: 'Why Join?',
  },
  benefits: {
    title: 'Start Your Journey',
    description: 'A world of wonders',
    items: ['Benefit 1', 'Benefit 2'],
  },
  quote: 'Deep Lore Quote',
  footer: {
    versionLabel: 'v',
    copyrightLabel: 'Machala',
    year: 2024,
    version: '1.0.0',
  },
  uiLabels: {
    email: 'Email Address',
    emailPlaceholder: 'hero@example.com',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    submit: 'Register Now',
    validation: {
      emailInvalid: 'Invalid email',
      passwordLength: 'Password too short (min 6)',
      passwordRequired: 'Required',
      passwordMismatch: 'Passwords do not match',
    },
  } satisfies RegisterUiLabels,
  backgroundSrc: '/test.jpg',
}

describe('RegisterView Integration', () => {
  it('renders all components correctly', () => {
    render(<RegisterViewUI {...MOCK_PROPS} />)

    expect(screen.getByText('Land of Machala')).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
    expect(screen.getAllByText('Why Join?')[0]).toBeInTheDocument()
  })

  it('validates password matching', async () => {
    render(<RegisterViewUI {...MOCK_PROPS} />)

    const submitBtn = screen.getByRole('button', { name: /Register Now/i })

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'wrong-pass' },
    })

    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
    })
  })

  it('validates password length', async () => {
    render(<RegisterViewUI {...MOCK_PROPS} />)

    const submitBtn = screen.getByRole('button', { name: /Register Now/i })

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } })
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: '123' } })

    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText('Password too short (min 6)')).toBeInTheDocument()
    })
  })
})
