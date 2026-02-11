import { REGISTRATION_BENEFITS } from '@/lib/game/constants/registration'

import { VStack } from '@/components/ui/core/stack'
import { GameAccordion } from '@/components/ui/navigation/accordion'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { MutedText, TextLink } from '@/components/ui/prefabs/typography/shared'
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
        <VStack gap="md" pb="xl" fullWidth>
          <RegistrationCard />
          <TextLink href="/login" align="center">
            Již máš účet? Přihlas se zde
          </TextLink>
        </VStack>
      </VStack>

      {/* Right Column: Benefits & Lore */}
      <VStack gap="md" fullWidth>
        <GameAccordion
          passthroughOnDesktop
          items={[
            {
              value: 'benefits',
              title: 'Výhody registrace',
              content: <RegistrationBenefits benefits={REGISTRATION_BENEFITS} />,
            },
          ]}
        />
        <LoreQuote />
        <Footer />
      </VStack>
    </>
  )
}
