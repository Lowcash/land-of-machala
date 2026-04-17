import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { LoginViewUI } from './view'

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
  card: {
    guestLabel: 'Enter as Guest',
    registerLabel: 'Create Account',
    orLabel: 'OR',
  },
  accordion: {
    statsTitle: 'World Stats',
    changelogTitle: 'Last Updates',
  },
  quote: 'Deep Lore Quote',
  stats: [
    { id: '1', label: 'Players', value: '1,234', color: 'info' as const },
    { id: '2', label: 'Items', value: '5,678', color: 'info' as const },
  ],
  changes: [
    {
      version: '1.0.0',
      date: '2024-01-01',
      description: 'Major release',
      type: 'feature' as const,
    },
  ],
  footer: {
    versionLabel: 'v',
    copyrightLabel: 'Machala',
    year: 2024,
    version: '1.0.0',
  },
  uiLabels: {
    email: 'Email Address',
    password: 'Password',
    submit: 'Login Now',
    rememberMe: 'Remember Me',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    validation: {
      emailInvalid: 'Invalid email',
      passwordRequired: 'Password is required',
    },
  },
  backgroundSrc: '/test.jpg',
}

describe('LoginView Integration', () => {
  it('renders all login components correctly', () => {
    render(<LoginViewUI {...MOCK_PROPS} />)

    expect(screen.getByText('Land of Machala')).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()

    // Multiple matches possible due to passthroughOnDesktop (Accordion Trigger + Component Title)
    expect(screen.getAllByText('World Stats')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Last Updates')[0]).toBeInTheDocument()
  })

  it('validates form and enables button only when valid', async () => {
    render(<LoginViewUI {...MOCK_PROPS} />)

    const submitBtn = screen.getByRole('button', { name: /Login Now/i })
    expect(submitBtn).toBeEnabled()

    await act(async () => {
      fireEvent.click(submitBtn)
    })

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } })

    await waitFor(() => {
      expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
      expect(screen.queryByText('Password is required')).not.toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(submitBtn)
    })
  })
})
