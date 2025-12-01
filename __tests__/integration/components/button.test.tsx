import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils'
import { Button } from '@/components/ui/button'

describe('components/ui/button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should apply variant classes', () => {
    render(<Button variant='destructive'>Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('should handle disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should render as child component with asChild', () => {
    render(
      <Button asChild>
        <a href='/test'>Link Button</a>
      </Button>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })
})
