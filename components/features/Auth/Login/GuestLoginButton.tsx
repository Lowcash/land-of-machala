'use client'

import { useGuestLogin } from '@/lib/hooks/auth/useGuestLogin'

import { Button } from '@/components/ui/button'

export function GuestLoginButton() {
  const { handleGuestLogin, isPending } = useGuestLogin()

  return (
    <Button
      onClick={handleGuestLogin}
      disabled={isPending}
      className="group border-game-gold/30 hover:border-game-gold hover:bg-game-gold/10 text-game-gold relative w-full overflow-hidden transition-all duration-300"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isPending ? 'Vstupuji...' : 'Hrát jako host'}
      </span>
    </Button>
  )
}
