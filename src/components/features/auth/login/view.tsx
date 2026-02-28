import { getTranslations } from 'next-intl/server'

import {
  resolveFooterProps,
  resolveTranslatedChangelog,
  resolveTranslatedLoreQuote,
  resolveTranslatedStats,
} from '@/lib/game/utils/resolvers'

import { GameAccordion } from '@/components/ui/navigation/accordion'
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
import type { LoginUiLabels } from './types'

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
  uiLabels: LoginUiLabels
  backgroundSrc: string
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
}: LoginViewUIProps) {
  return (
    <>
      <Background src={backgroundSrc} />

      <AuthGrid>
        <FeatureSection>
          <BrandedHero title={hero.title} subtitle={hero.subtitle} description={hero.description} />
          <LoginCard
            guestLabel={card.guestLabel}
            registerLabel={card.registerLabel}
            orLabel={card.orLabel}
            uiLabels={uiLabels}
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
    </>
  )
}

export async function LoginView({ backgroundSrc }: { backgroundSrc: string }) {
  const t = await getTranslations('Auth.Login')
  const tc = await getTranslations('Common')
  const tg = await getTranslations('Game')

  const uiLabels = {
    email: t('form.email'),
    password: t('form.password'),
    submit: t('form.submit'),
    rememberMe: t('form.rememberMe'),
    validation: {
      emailInvalid: t('form.validation.emailInvalid'),
      passwordRequired: t('form.validation.passwordRequired'),
    },
  }

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
      uiLabels={uiLabels}
      backgroundSrc={backgroundSrc}
    />
  )
}
