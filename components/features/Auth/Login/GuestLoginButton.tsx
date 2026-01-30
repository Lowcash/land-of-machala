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
      className="group relative w-full overflow-hidden border-2"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isPending ? 'Vstupuji...' : 'Hrát jako host'}
      </span>
    </Button>
  )
}
