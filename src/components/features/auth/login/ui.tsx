'use client'

import { GameAccordion } from '@/components/ui/navigation/accordion'
import { EntranceStack } from '@/components/ui/prefabs/animations/entrance-stack'
import { BrandedHero } from '@/components/ui/prefabs/layout/branded-hero'
import {
  Changelog,
  type TranslatedChangelogEntry,
} from '@/components/ui/prefabs/narrative/changelog'
import { LoreQuote } from '@/components/ui/prefabs/narrative/lore-quote'
import { Stats, type TranslatedServerStat } from '@/components/ui/prefabs/narrative/stats'
import { AuthGrid, FeatureSection } from '@/components/ui/prefabs/structure'
import { Background } from '@/components/ui/shared/background'
import { Footer, type FooterProps } from '@/components/ui/shared/footer'

import { LoginCard } from './card'
import type { LoginFormValues } from './form'
import type { LoginUiLabels } from './types'

export interface LoginViewUIProps {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  card: {
    guestLabel: string
    registerLabel: string
    orLabel: string
  }
  accordion: {
    statsTitle: string
    changelogTitle: string
  }
  quote: string
  stats: TranslatedServerStat[]
  changes: TranslatedChangelogEntry[]
  footer: FooterProps
  uiLabels: LoginUiLabels
  backgroundSrc: string
  onLogin?: (values: LoginFormValues) => void | Promise<void>
  onRegister?: () => void
  onGuestAccess?: () => void
  isLoading?: boolean
}

export function LoginViewUI({
  hero,
  card,
  accordion,
  quote,
  stats,
  changes,
  footer,
  uiLabels,
  backgroundSrc,
  onLogin,
  onRegister,
  onGuestAccess,
  isLoading,
}: LoginViewUIProps) {
  return (
    <EntranceStack fullHeight fullWidth py="xl">
      <Background src={backgroundSrc} />

      <AuthGrid>
        <FeatureSection gap="xl">
          <BrandedHero title={hero.title} subtitle={hero.subtitle} description={hero.description} />
          <LoginCard
            onLogin={onLogin}
            guestLabel={card.guestLabel}
            registerLabel={card.registerLabel}
            orLabel={card.orLabel}
            uiLabels={uiLabels}
            onRegister={onRegister}
            onGuestAccess={onGuestAccess}
            isLoading={isLoading}
          />
        </FeatureSection>

        <FeatureSection>
          <GameAccordion
            passthroughOnDesktop
            items={[
              {
                value: 'stats',
                title: accordion.statsTitle,
                content: <Stats title={accordion.statsTitle} stats={stats} variant="responsive" />,
              },
              {
                value: 'changelog',
                title: accordion.changelogTitle,
                content: (
                  <Changelog
                    title={accordion.changelogTitle}
                    changes={changes}
                    variant="responsive"
                  />
                ),
              },
            ]}
          />
          <LoreQuote quote={quote} />
          <Footer {...footer} />
        </FeatureSection>
      </AuthGrid>
    </EntranceStack>
  )
}
