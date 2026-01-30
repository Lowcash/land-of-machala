'use client'

import { useGuestLogin } from '@/lib/hooks/auth/useGuestLogin'

import { Button } from '@/components/ui/button'

export function GuestLoginButton() {
  const { handleGuestLogin, isPending } = useGuestLogin()

  return (
    <Button
      onClick={handleGuestLogin}
      disabled={isPending}
      className="group border-game-copper/50 hover:border-game-gold text-game-gold relative w-full overflow-hidden border bg-black/60 transition-all duration-300 hover:bg-black/80"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isPending ? 'Vstupuji...' : 'Hrát jako host'}
      </span>
    </Button>
  )
}
