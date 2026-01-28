import type { Metadata } from 'next'
import Link from 'next/link'

import { GuestLoginButton } from '@/components/features/Auth/Login/GuestLoginButton'
import { LoginForm } from '@/components/features/Auth/Login/LoginForm'
import { AuthCard } from '@/components/features/Auth/Shared/AuthCard'
import { Button } from '@/components/ui/button'
import { GameDivider } from '@/components/ui/game-divider'

export const metadata: Metadata = {
  title: 'Přihlášení | Land of Machala',
  description: 'Přihlas se do hry Land of Machala a pokračuj ve svém dobrodružství.',
}

export default function LoginPage() {
  return (
    <AuthCard>
      <LoginForm />

      <GameDivider label="NEBO" />

      <div className="space-y-3">
        <GuestLoginButton />

        <Link href="/register" className="block w-full">
          <Button
            variant="ghost"
            className="border-game-gold-muted font-fantasy text-game-gold hover:border-game-gold hover:text-game-gold w-full border-2"
          >
            Vytvořit nový účet
          </Button>
        </Link>
      </div>
    </AuthCard>
  )
}
