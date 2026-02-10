import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

test('renders button with children', async () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})

test('renders loading state', async () => {
  render(<Button loading>Submit</Button>)
  const button = screen.getByRole('button')
  expect(button).toBeDisabled()
  expect(button.querySelector('.animate-spin')).toBeInTheDocument()
})

test('renders disabled state', async () => {
  render(<Button disabled>Locked</Button>)
  expect(screen.getByRole('button')).toBeDisabled()
})
