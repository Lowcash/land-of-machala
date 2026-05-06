import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RootEntryShell } from '@/components/features/auth/entry/shell'

describe('RootEntryShell', () => {
  it('switches to register state and validates required fields', async () => {
    const user = userEvent.setup()

    render(<RootEntryShell />)

    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^create account$/i }))

    expect(screen.getByText('Enter a valid email.')).toBeInTheDocument()
    expect(screen.getByText('Secret phrase must have at least 6 characters.')).toBeInTheDocument()
    expect(
      screen.getByText('Merchant Laws and Privacy Codex must be accepted.')
    ).toBeInTheDocument()
  })

  it('submits valid login fields through callback', async () => {
    const user = userEvent.setup()
    const onLoginSuccess = vi.fn()

    render(<RootEntryShell onLoginSuccess={onLoginSuccess} />)

    await user.clear(screen.getByLabelText(/email/i))
    await user.type(screen.getByLabelText(/email/i), 'traveller@realm.com')
    await user.type(screen.getByLabelText(/secret phrase/i), 'secret-phrase')
    await user.click(screen.getByRole('button', { name: /enter the realm/i }))

    expect(onLoginSuccess).toHaveBeenCalledTimes(1)
  })

  it('submits valid register fields through callback', async () => {
    const user = userEvent.setup()
    const onRegisterSuccess = vi.fn()

    render(<RootEntryShell onRegisterSuccess={onRegisterSuccess} />)

    await user.click(screen.getByRole('button', { name: /create account/i }))
    await user.type(screen.getByLabelText(/email/i), 'merchant@realm.com')
    await user.type(screen.getByLabelText(/secret phrase/i), 'market-oath')
    await user.click(screen.getByRole('checkbox', { name: /merchant laws/i }))
    await user.click(screen.getByRole('button', { name: /^create account$/i }))

    expect(onRegisterSuccess).toHaveBeenCalledTimes(1)
  })

  it('triggers guest entry callback from sign-in actions', async () => {
    const user = userEvent.setup()
    const onGuestEntry = vi.fn()

    render(<RootEntryShell onGuestEntry={onGuestEntry} />)

    await user.click(screen.getByRole('button', { name: /continue as guest/i }))

    expect(onGuestEntry).toHaveBeenCalledTimes(1)
  })
})
