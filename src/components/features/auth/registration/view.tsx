import { REGISTRATION_BENEFITS } from '@/lib/game/constants/registration'

import { HStack, VStack } from '@/components/ui/core/stack'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { MutedText, TextLink } from '@/components/ui/prefabs/typography/shared'
import { Text } from '@/components/ui/core/typography'
import { Footer } from '@/components/ui/shared/footer'

import { RegistrationBenefits } from './benefits'
import { RegistrationCard } from './card'

export const revalidate = 3600

export function RegistrationView() {
  return (
    <>
      {/* Left Column: Hero & Registration */}
      <VStack gap="md" fullWidth>
        <BrandedHero subtitle="Začni svou legendu" description="Tvá cesta začíná právě zde..." />
        <VStack gap="md" pb="md" fullWidth>
          <RegistrationCard />
          <HStack gap="xs" justify="center">
            <Text variant="primary" color="secondary">
              Již máš účet?
            </Text>
            <TextLink href="/login">Přihlas se zde</TextLink>
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
