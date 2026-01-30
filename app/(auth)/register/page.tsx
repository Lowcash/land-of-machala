import type { Metadata } from 'next'
import Link from 'next/link'

import { Sparkles, Swords } from 'lucide-react'

import { RegisterForm } from '@/components/features/Auth/Register/RegisterForm'
import { RegisterInfo } from '@/components/features/Auth/Register/RegisterInfo'
import { AuthCard } from '@/components/features/Auth/Shared/AuthCard'
import { Layout } from '@/components/features/Auth/Shared/Layout'

export const metadata: Metadata = {
  title: 'Registrace | Land of Machala',
  description: 'Vytvoř si nový účet a začni své dobrodružství v Land of Machala.',
}

export default function RegisterPage() {
  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg">
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        {/* Left Column: Register Form */}
        <div className="mx-auto w-full max-w-md">
          {/* Logo & Title */}
          <div className="mb-6 text-center sm:mb-8">
            <div className="relative mb-4 inline-block">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#ffd700]/20 to-[#8b6f47]/20 blur-2xl"></div>
              <div className="relative rounded-full border-2 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] p-4 shadow-2xl">
                <Swords className="h-10 w-10 text-[#ffd700]" />
              </div>
            </div>

            <h1
              className="mb-2 text-3xl whitespace-nowrap text-[#ffd700] sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'var(--font-medieval)',
                textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
              }}
            >
              Land of Machala
            </h1>

            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 text-[#d4a574]" />
              <p className="text-sm text-[#d4a574] sm:text-base">Vytvoř si nový účet</p>
              <Sparkles className="h-3 w-3 text-[#d4a574]" />
            </div>

            <p className="mt-2 text-xs text-[#8b7355] italic sm:text-sm">
              Tvá legenda čeká na sepsání...
            </p>
          </div>

          <AuthCard>
            <RegisterForm />

            <div className="mt-4 text-center">
              <p className="text-sm text-[#8b7355] sm:text-base">
                Již máš účet?{' '}
                <Link
                  href="/login"
                  className="text-[#d4a574] transition-colors hover:text-[#ffd700] hover:underline"
                >
                  Přihlas se zde
                </Link>
              </p>
            </div>
          </AuthCard>
        </div>

        {/* Right Column: Info - desktop only */}
        <RegisterInfo />
      </div>
    </Layout>
  )
}
