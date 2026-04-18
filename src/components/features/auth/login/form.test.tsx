import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { LoginForm } from './form'

const mockUiLabels = {
  email: 'Email Address',
  password: 'Secure Password',
  rememberMe: 'Remember Me',
  submit: 'Sign In',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Password',
  validation: {
    emailInvalid: 'Invalid email format',
    passwordRequired: 'Password is required',
  },
}

describe('LoginForm', () => {
  it('renders all fields and the submit button correctly', () => {
    render(<LoginForm uiLabels={mockUiLabels} />)

    expect(screen.getByLabelText(mockUiLabels.email)).toBeDefined()
    expect(screen.getByLabelText(mockUiLabels.password)).toBeDefined()
    expect(screen.getByLabelText(mockUiLabels.rememberMe)).toBeDefined()

    const submitButton = screen.getByRole('button', { name: mockUiLabels.submit })
    expect(submitButton).toBeDefined()
    expect(submitButton).toBeEnabled()
  })

  it('keeps the submit button enabled when email and password are provided', async () => {
    render(<LoginForm uiLabels={mockUiLabels} />)

    const emailInput = screen.getByLabelText(mockUiLabels.email)
    const passwordInput = screen.getByLabelText(mockUiLabels.password)
    const submitButton = screen.getByRole('button', { name: mockUiLabels.submit })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })
  })

  it('calls onLogin with the correct values upon submission', async () => {
    const user = userEvent.setup()
    const onLoginMock = vi.fn()
    render(<LoginForm uiLabels={mockUiLabels} onLogin={(v) => onLoginMock(v)} />)

    const emailInput = screen.getByLabelText(mockUiLabels.email)
    const passwordInput = screen.getByLabelText(mockUiLabels.password)
    const submitButton = screen.getByRole('button', { name: mockUiLabels.submit })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    await user.click(submitButton)

    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalledTimes(1)
      expect(onLoginMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      })
    })
  })

  it('displays validation errors on invalid email submission', async () => {
    render(<LoginForm uiLabels={mockUiLabels} />)

    const emailInput = screen.getByLabelText(mockUiLabels.email)
    const passwordInput = screen.getByLabelText(mockUiLabels.password)
    const submitButton = screen.getByRole('button', { name: mockUiLabels.submit })

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(mockUiLabels.validation.emailInvalid)).toBeDefined()
      expect(submitButton).toBeEnabled()
    })
  })
})
