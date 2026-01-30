import type { Metadata } from 'next'
import Link from 'next/link'

import { Scroll, Users } from 'lucide-react'

import { Changelog } from '@/components/features/Auth/Login/Changelog'
import { GuestLoginButton } from '@/components/features/Auth/Login/GuestLoginButton'
import { HeroSection } from '@/components/features/Auth/Login/HeroSection'
import { LoginForm } from '@/components/features/Auth/Login/LoginForm'
import { ServerStats } from '@/components/features/Auth/Login/ServerStats'
import { AuthCard } from '@/components/features/Auth/Shared/AuthCard'
import { Layout } from '@/components/features/Auth/Shared/Layout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { GameDivider } from '@/components/ui/game-divider'

export const metadata: Metadata = {
  title: 'Přihlášení | Land of Machala',
  description: 'Přihlas se do hry Land of Machala a pokračuj ve svém dobrodružství.',
}

export default function LoginPage() {
  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg">
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        {/* Left Column: Login Form */}
        <div className="mx-auto flex w-full max-w-md flex-col items-center">
          <HeroSection />

          <AuthCard>
            <LoginForm />

            <GameDivider label="NEBO" />

            <div className="space-y-3">
              <GuestLoginButton />

              <Link href="/register" className="block w-full">
                <Button
                  variant="ghost"
                  className="border-game-copper/50 hover:border-game-gold font-fantasy text-game-gold w-full border bg-black/60 hover:bg-black/80"
                >
                  Vytvořit nový účet
                </Button>
              </Link>
            </div>
          </AuthCard>

          {/* Mobile Info Accordions - visible only on small screens */}
          <div className="mt-6 w-full lg:hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="stats" className="border-[#8b6f47]">
                <AccordionTrigger className="rounded-lg border border-[#8b6f47] bg-black/80 px-4 py-3 text-[#ffd700] no-underline hover:bg-[#8b6f47]/10 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span style={{ fontFamily: 'var(--font-fantasy)' }}>Statistiky serveru</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 border-0 p-0">
                  <ServerStats />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="updates" className="mt-3 border-[#8b6f47]">
                <AccordionTrigger className="rounded-lg border border-[#8b6f47] bg-black/80 px-4 py-3 text-[#ffd700] no-underline hover:bg-[#8b6f47]/10 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Scroll className="h-4 w-4" />
                    <span style={{ fontFamily: 'var(--font-fantasy)' }}>Nejnovější změny</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 border-0 p-0">
                  <Changelog />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Right Column: Info & Stats (Desktop Only) */}
        <div className="hidden w-full max-w-md space-y-6 self-end lg:block">
          <ServerStats />
          <Changelog />
        </div>
      </div>
    </Layout>
  )
}
