import { getTranslations } from 'next-intl/server'

import {
  resolveFooterProps,
  resolveTranslatedBenefits,
  resolveTranslatedLoreQuote,
} from '@/lib/game/utils/resolvers'

import { HStack, Stack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { Benefits } from '@/components/ui/prefabs/narrative/benefits'
import { TextLink } from '@/components/ui/prefabs/typography/shared'
import { Footer, type FooterProps } from '@/components/ui/shared/footer'

import { RegisterCard } from './card'

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
}

export function RegisterViewUI({
  hero,
  footerLinks,
  accordion,
  benefits,
  quote,
  footer,
}: RegisterViewUIProps) {
  return (
    <Stack gap="xl" fullWidth align="end" justify="center" md={{ direction: 'row' }}>
      <VStack gap="md" fullWidth>
        <BrandedHero title={hero.title} subtitle={hero.subtitle} description={hero.description} />
        <VStack gap="md" pb="md" fullWidth>
          <RegisterCard />

          <HStack gap="xs" justify="center" fullWidth>
            <Text variant="primary" color="secondary">
              {footerLinks.hasAccount}
            </Text>
            <TextLink href="/login">{footerLinks.login}</TextLink>
          </HStack>
        </VStack>
      </VStack>

      <VStack gap="md" fullWidth>
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
      </VStack>
    </Stack>
  )
}

export async function RegisterView() {
  const t = await getTranslations('Auth.Registration')
  const tc = await getTranslations('Common')
  const tg = await getTranslations('Game')

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
    />
  )
}
