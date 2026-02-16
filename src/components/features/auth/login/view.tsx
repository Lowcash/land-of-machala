import { getTranslations } from 'next-intl/server'

import {
  resolveFooterProps,
  resolveTranslatedChangelog,
  resolveTranslatedLoreQuote,
  resolveTranslatedStats,
} from '@/lib/game/utils/resolvers'

import { Stack, VStack } from '@/components/ui/core/stack'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import {
  Changelog,
  type TranslatedChangelogEntry,
} from '@/components/ui/prefabs/narrative/changelog'
import { Stats, type TranslatedServerStat } from '@/components/ui/prefabs/narrative/stats'
import { Footer, type FooterProps } from '@/components/ui/shared/footer'

import { LoginCard } from './card'

interface LoginViewUIProps {
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
}

export function LoginViewUI({
  hero,
  card,
  accordion,
  quote,
  stats,
  changes,
  footer,
}: LoginViewUIProps) {
  return (
    <Stack gap="xl" fullWidth align="end" justify="center" lg={{ direction: 'row' }}>
      <VStack gap="md" fullWidth>
        <BrandedHero title={hero.title} subtitle={hero.subtitle} description={hero.description} />
        <VStack gap="md" pb="md" fullWidth>
          <LoginCard
            guestLabel={card.guestLabel}
            registerLabel={card.registerLabel}
            orLabel={card.orLabel}
          />
        </VStack>
      </VStack>

      <VStack gap="md" fullWidth>
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
      </VStack>
    </Stack>
  )
}

export async function LoginView() {
  const t = await getTranslations('Auth.Login')
  const tc = await getTranslations('Common')
  const tg = await getTranslations('Game')

  return (
    <LoginViewUI
      hero={{
        title: 'Land of Machala',
        subtitle: t('subtitle'),
        description: t('description'),
      }}
      card={{
        guestLabel: t('actions.guest'),
        registerLabel: t('actions.register'),
        orLabel: tc('or'),
      }}
      accordion={{
        statsTitle: t('stats_title'),
        changelogTitle: t('changelog_title'),
      }}
      quote={resolveTranslatedLoreQuote(tg)}
      stats={resolveTranslatedStats(tg)}
      changes={resolveTranslatedChangelog(tg)}
      footer={resolveFooterProps(tc)}
    />
  )
}
