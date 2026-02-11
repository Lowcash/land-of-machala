import { LATEST_CHANGES } from '@/lib/game/constants/changelog'
import { SERVER_STATS } from '@/lib/game/constants/stats'

import { Changelog } from '@/components/features/auth/changelog'
import { LoginCard } from '@/components/features/auth/login.card'
import { Stats } from '@/components/features/auth/stats'
import { VStack } from '@/components/ui/core/stack'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { Footer } from '@/components/ui/shared/footer'

export const dynamic = 'force-dynamic'

export function LoginView() {
  return (
    <VStack gap="xl" align="center" fullWidth={true}>
      <BrandedHero subtitle="Vytvoř si nový účet" description="Tvá legenda čeká na sepsání..." />
      <LoginCard />
      <LoreQuote />
      <Stats stats={SERVER_STATS} />
      <Changelog changes={LATEST_CHANGES} />
      <Footer />
    </VStack>
  )
}
