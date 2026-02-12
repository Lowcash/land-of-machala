import { useTranslations } from 'next-intl'

import { REGISTRATION_BENEFITS } from '@/lib/game/constants/registration'

import { HStack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { TextLink } from '@/components/ui/prefabs/typography/shared'
import { Footer } from '@/components/ui/shared/footer'

import { RegistrationBenefits } from './benefits'
import { RegistrationCard } from './card'

export const revalidate = 3600

export function RegistrationView() {
  const t = useTranslations('Auth.Registration')

  return (
    <>
      {/* Left Column: Hero & Registration */}
      <VStack gap="md" fullWidth>
        <BrandedHero subtitle={t('subtitle')} description={t('description')} />
        <VStack gap="md" pb="md" fullWidth>
          <RegistrationCard />
          <HStack gap="xs" justify="center">
            <Text variant="primary" color="secondary">
              {t('form.hasAccount')}
            </Text>
            <TextLink href="/login">{t('form.login')}</TextLink>
          </HStack>
        </VStack>
      </VStack>

      {/* Right Column: Benefits & Lore */}
      <VStack gap="md" fullWidth>
        <GameAccordion
          passthroughOnDesktop
          items={[
            {
              value: 'benefits',
              title: 'Začni své dobrodružství',
              content: <RegistrationBenefits benefits={REGISTRATION_BENEFITS} minimal />,
            },
          ]}
        />
        <LoreQuote />
        <Footer />
      </VStack>
    </>
  )
}
