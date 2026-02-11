import Link from 'next/link'

import { RegistrationBenefits } from '@/components/features/auth/registration.benefits'
import { RegistrationCard } from '@/components/features/auth/registration.card'
import { HStack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'
import { LoreQuote } from '@/components/ui/prefabs/lore-quote'
import { Footer } from '@/components/ui/shared/footer'

export const revalidate = 3600

export function RegistrationView() {
  return (
    <VStack fullHeight justify="center" p="xl" align="center">
      <HStack gap="xxl" align="start" justify="center" wrap fullWidth maxWidth="full">
        {/* Left Column: Hero & Registration */}
        <VStack gap="xl" maxWidth="md" fullWidth mx="auto">
          <BrandedHero
            subtitle="Začni svou legendu"
            description="Tvá cesta začíná právě zde..."
          />
          <RegistrationCard />
          
          <VStack align="center" gap="sm">
            <Text variant="small" color="secondary">
              Již máš účet?{' '}
              <Link href="/login" className="text-(--color-primary) hover:underline">
                Přihlas se zde
              </Link>
            </Text>
          </VStack>
        </VStack>

        {/* Right Column: Benefits & Lore */}
        <VStack gap="lg" maxWidth="md" fullWidth mx="auto">
          <RegistrationBenefits />
          <LoreQuote />
          <Footer />
        </VStack>
      </HStack>
    </VStack>
  )
}
