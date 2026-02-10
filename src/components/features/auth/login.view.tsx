import { LATEST_CHANGES } from '@/lib/game/constants/changelog'
import { SERVER_STATS } from '@/lib/game/constants/stats'

import { Changelog } from '@/components/features/auth/changelog'
import { LoginCard } from '@/components/features/auth/login.card'
import { Stats } from '@/components/features/auth/stats'
import { VStack } from '@/components/ui/core/stack'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'

/**
 * Main view for the login page.
 * Includes the branded hero, login card, server stats, and changelog.
 */
export function LoginView() {
  return (
    <VStack gap="xl" align="center">
      <BrandedHero subtitle="Vytvoř si nový účet" description="Tvá legenda čeká na sepsání..." />
      <LoginCard />
      <Stats stats={SERVER_STATS} />
      <Changelog changes={LATEST_CHANGES} />
    </VStack>
  )
}
