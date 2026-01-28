import type { Metadata } from 'next'
import Link from 'next/link'

import { RegisterForm } from '@/components/features/Auth/Register/RegisterForm'
import { AuthCard } from '@/components/features/Auth/Shared/AuthCard'

export const metadata: Metadata = {
  title: 'Registrace | Land of Machala',
  description: 'Vytvoř si nový účet a začni své dobrodružství v Land of Machala.',
}

export default function RegisterPage() {
  return (
    <AuthCard>
      <RegisterForm />

      <div className="mt-4 text-center">
        <p className="text-game-copper-muted text-sm sm:text-base">
          Již máš účet?{' '}
          <Link
            href="/login"
            className="text-game-gold-muted hover:text-game-gold transition-colors hover:underline"
          >
            Přihlas se zde
          </Link>
        </p>
      </div>
    </AuthCard>
  )
}
