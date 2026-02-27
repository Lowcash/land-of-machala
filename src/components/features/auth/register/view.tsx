import { getTranslations } from 'next-intl/server'

import {
  resolveFooterProps,
  resolveTranslatedBenefits,
  resolveTranslatedLoreQuote,
} from '@/lib/game/utils/resolvers'

import { HStack, Stack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { BrandedHero } from '@/components/ui/prefabs/layout/branded-hero'
import { Benefits } from '@/components/ui/prefabs/narrative/benefits'
import { LoreQuote } from '@/components/ui/prefabs/narrative/lore-quote'
import { FeatureSection } from '@/components/ui/prefabs/structure'
import { TextLink } from '@/components/ui/prefabs/typography/shared'
import { Background } from '@/components/ui/shared/background'
import { Footer, type FooterProps } from '@/components/ui/shared/footer'

import { RegisterCard } from './card'
import type { RegisterUiLabels } from './types'

interface RegisterViewUIProps {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  footerLinks: {
    hasAccount: string
    login: string
  }
  accordion: {
    benefitsTitle: string
  }
  benefits: {
    title: string
    description: string
    items: string[]
  }
  quote: string
  footer: FooterProps
  uiLabels: RegisterUiLabels
  backgroundSrc: string
}

export function RegisterViewUI({
  hero,
  footerLinks,
  accordion,
  benefits,
  quote,
  footer,
  uiLabels,
  backgroundSrc,
}: RegisterViewUIProps) {
  return (
    <>
      <Background src={backgroundSrc} />
      <Stack gap="xl" fullWidth align="end" justify="center" md={{ direction: 'row' }}>
        <FeatureSection>
          <BrandedHero title={hero.title} subtitle={hero.subtitle} description={hero.description} />
          <RegisterCard uiLabels={uiLabels} />

          <HStack gap="xs" justify="center" fullWidth>
            <Text variant="primary" color="secondary">
              {footerLinks.hasAccount}
            </Text>
            <TextLink href="/login">{footerLinks.login}</TextLink>
          </HStack>
        </FeatureSection>

        <FeatureSection>
          <GameAccordion
            passthroughOnDesktop
            items={[
              {
                value: 'benefits',
                title: accordion.benefitsTitle,
                content: (
                  <Benefits
                    title={benefits.title}
                    description={benefits.description}
                    benefits={benefits.items}
                    variant="responsive"
                  />
                ),
              },
            ]}
          />
          <LoreQuote quote={quote} />
          <Footer {...footer} />
        </FeatureSection>
      </Stack>
    </>
  )
}

export async function RegisterView({ backgroundSrc }: { backgroundSrc: string }) {
  const t = await getTranslations('Auth.Registration')
  const tc = await getTranslations('Common')
  const tg = await getTranslations('Game')

  const uiLabels = {
    email: t('form.email'),
    password: t('form.password'),
    confirmPassword: t('form.confirmPassword'),
    submit: t('form.submit'),
    validation: {
      emailInvalid: t('form.validation.emailInvalid'),
      passwordLength: t('form.validation.passwordLength'),
      passwordRequired: t('form.validation.passwordRequired'),
      passwordMismatch: t('form.validation.passwordMismatch'),
    },
  }

  return (
    <RegisterViewUI
      hero={{
        title: 'Land of Machala',
        subtitle: t('subtitle'),
        description: t('description'),
      }}
      footerLinks={{
        hasAccount: t('form.hasAccount'),
        login: t('form.login'),
      }}
      accordion={{
        benefitsTitle: t('benefits_title'),
      }}
      benefits={{
        title: t('benefits_title'),
        description: t('benefits_title_description'),
        items: resolveTranslatedBenefits(tg),
      }}
      quote={resolveTranslatedLoreQuote(tg)}
      footer={resolveFooterProps(tc)}
      uiLabels={uiLabels}
      backgroundSrc={backgroundSrc}
    />
  )
}
