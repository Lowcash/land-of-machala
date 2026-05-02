import { createElement } from 'react'

import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { alt, src, ...rest } = props

    delete rest.fill
    delete rest.priority

    return createElement('img', { alt, src, ...rest })
  },
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  })),
})
