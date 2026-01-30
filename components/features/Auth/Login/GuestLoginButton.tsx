'use client'

import { useGuestLogin } from '@/lib/hooks/auth/useGuestLogin'

import { Button } from '@/components/ui/button'

export function GuestLoginButton() {
  const { handleGuestLogin, isPending } = useGuestLogin()

  return (
    <Button
      onClick={handleGuestLogin}
      disabled={isPending}
      variant="game-ghost"
      fullWidth
      label={isPending ? 'Vytváření účtu...' : 'Zkusit hru jako host (bez registrace)'}
    />
  )
}
