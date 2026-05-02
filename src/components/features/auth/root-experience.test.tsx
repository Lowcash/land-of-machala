import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { RootExperience } from '@/components/features/auth/root-experience'

describe('RootExperience', () => {
  it('moves from entry to origins and returns to entry after hero confirmation', async () => {
    const user = userEvent.setup()

    render(<RootExperience />)

    await user.click(screen.getByRole('button', { name: /continue as guest/i }))

    expect(await screen.findByRole('heading', { name: /shape your journey/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /bustling city streets/i }))
    await user.click(screen.getByRole('button', { name: /continue/i }))

    expect(await screen.findByRole('heading', { name: /shape your hero/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /confirm hero/i }))

    expect(await screen.findByRole('heading', { name: /enter the realm/i })).toBeInTheDocument()
    expect(screen.getByText(/hero is prepared/i)).toBeInTheDocument()
  }, 10000)
})
