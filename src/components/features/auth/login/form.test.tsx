import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { LoginForm } from './form'

const mockUiLabels = {
  email: 'Email Address',
  password: 'Secure Password',
  rememberMe: 'Remember Me',
  submit: 'Sign In',
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
    expect(submitButton.hasAttribute('disabled')).toBe(true) // Should be disabled initially (empty fields)
  })

  it('enables the submit button when email and password are provided', async () => {
    render(<LoginForm uiLabels={mockUiLabels} />)

    const emailInput = screen.getByLabelText(mockUiLabels.email)
    const passwordInput = screen.getByLabelText(mockUiLabels.password)
    const submitButton = screen.getByRole('button', { name: mockUiLabels.submit })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    // Button should become enabled
    await waitFor(() => {
      expect(submitButton.hasAttribute('disabled')).toBe(false)
    })
  })

  it('calls onLogin with the correct values upon submission', async () => {
    const onLoginMock = vi.fn()
    render(<LoginForm uiLabels={mockUiLabels} onLogin={onLoginMock} />)

    const emailInput = screen.getByLabelText(mockUiLabels.email)
    const passwordInput = screen.getByLabelText(mockUiLabels.password)
    const submitButton = screen.getByRole('button', { name: mockUiLabels.submit })

    const rememberMeCheckbox = screen.getByRole('checkbox')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    // Custom checkboxes often respond better to click than change in tests
    fireEvent.click(rememberMeCheckbox)

    fireEvent.click(submitButton)

    await waitFor(
      () => {
        expect(onLoginMock).toHaveBeenCalledTimes(1)
        expect(onLoginMock).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          rememberMe: true,
        })
      },
      { timeout: 3000 }
    )
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
    })
  })
})
