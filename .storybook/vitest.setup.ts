import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/nextjs-vite'
import { beforeAll, vi } from 'vitest'

import * as projectAnnotations from './preview'

// Apply the project annotations to the tests to ensure decorators (like fonts and themes) work
beforeAll(() => {
  setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
})

// Mock the i18n routing wrapper used throughout the application
// so that Storybook stories can be successfully executed by Vitest
vi.mock('@/i18n/routing', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
    usePathname: () => '/',
  }
})
