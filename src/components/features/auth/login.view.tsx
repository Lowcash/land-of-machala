import { LATEST_CHANGES } from '@/lib/game/constants/changelog'
import { SERVER_STATS } from '@/lib/game/constants/stats'

import { Changelog } from '@/components/features/auth/changelog'
import { LoginCard } from '@/components/features/auth/login.card'
import { Stats } from '@/components/features/auth/stats'
import { HStack, VStack } from '@/components/ui/core/stack'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { Footer } from '@/components/ui/shared/footer'

export const revalidate = 3600 // Revalidate every hour

export function LoginView() {
  return (
    <VStack fullHeight justify="center" p="xl" align="center">
      <HStack gap="xxl" align="start" justify="center" wrap fullWidth maxWidth="full">
        {/* Left Column: Hero & Auth */}
        <VStack gap="xl" flex="1" align="center" maxWidth="xl">
          <BrandedHero subtitle="Vytvoř si nový účet" description="Tvá legenda čeká na sepsání..." />
          <LoginCard />
        </VStack>

        {/* Right Column: Info & Footer */}
        <VStack gap="lg" flex="1" maxWidth="2xl">
          <Stats stats={SERVER_STATS} />
          <Changelog changes={LATEST_CHANGES} />
          <LoreQuote />
          <Footer />
        </VStack>
      </HStack>
    </VStack>
  )
}
