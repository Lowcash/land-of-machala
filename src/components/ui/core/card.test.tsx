import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from './card'

describe('Card', () => {
  it('renders card with children', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders primary variant', () => {
    const { container } = render(<Card variant="primary">Primary Card</Card>)
    expect(container.firstChild).toHaveClass('border-(--color-secondary)')
  })

  it('renders secondary variant', () => {
    const { container } = render(<Card variant="secondary">Secondary Card</Card>)
    expect(container.firstChild).toHaveClass('border-(--color-secondary)/40')
  })
})
