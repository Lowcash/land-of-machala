import { useTranslations } from 'next-intl'

import { LATEST_CHANGES } from '@/lib/game/constants/changelog'
import { SERVER_STATS } from '@/lib/game/constants/stats'

import { Stats } from '@/components/features/auth/stats/stats'
import { VStack } from '@/components/ui/core/stack'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { Footer } from '@/components/ui/shared/footer'

import { LoginCard } from './card'
import { Changelog } from './changelog'

export const revalidate = 3600 // Revalidate every hour

export function LoginView() {
  const t = useTranslations('Auth.Login')

  return (
    <>
      {/* Left Column: Hero & Auth */}
      <VStack gap="md" fullWidth>
        <BrandedHero subtitle={t('subtitle')} description={t('description')} />
        <VStack gap="md" pb="md" fullWidth>
          <LoginCard />
        </VStack>
      </VStack>

      {/* Right Column: Info & Footer */}
      <VStack gap="md" fullWidth>
        <GameAccordion
          passthroughOnDesktop
          items={[
            {
              value: 'stats',
              title: 'Statistiky serveru',
              content: <Stats stats={SERVER_STATS} minimal />,
            },
            {
              value: 'changelog',
              title: 'Poslední změny',
              content: <Changelog changes={LATEST_CHANGES} minimal />,
            },
          ]}
        />
        <LoreQuote />
        <Footer />
      </VStack>
    </>
  )
}
