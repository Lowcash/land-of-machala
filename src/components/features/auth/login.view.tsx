import { LATEST_CHANGES } from '@/lib/game/constants/changelog'
import { SERVER_STATS } from '@/lib/game/constants/stats'

import { Changelog } from '@/components/features/auth/changelog'
import { LoginCard } from '@/components/features/auth/login.card'
import { Stats } from '@/components/features/auth/stats'
import { VStack } from '@/components/ui/core/stack'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { Footer } from '@/components/ui/shared/footer'

export const revalidate = 3600 // Revalidate every hour

export function LoginView() {
  return (
    <main className="container mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6 py-12 lg:py-24">
      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* Left Column: Hero & Auth Form */}
        <VStack gap="xl" align="center">
          <BrandedHero subtitle="Vytvoř si nový účet" description="Tvá legenda čeká na sepsání..." />
          <LoginCard />
        </VStack>

        {/* Right Column: Secondary Info */}
        <VStack gap="xl">
          <Stats stats={SERVER_STATS} />
          <Changelog changes={LATEST_CHANGES} />
          <LoreQuote />
          <Footer />
        </VStack>
      </div>
    </main>
  )
}
