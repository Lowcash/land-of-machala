import { Sparkles } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { HStack, VStack } from '@/components/ui/stack'
import { GoldTitle, MutedText, P, Span } from '@/components/ui/typography'

/**
 * Information panel for the registration page.
 * Explains the benefits of joining the game.
 */
export function RegisterInfo() {
  const heroText =
    'V dobách temnoty se rodí legendy. Budeš jednou z nich, nebo padneš v zapomnění jako ti před tebou?'

  return (
    <VStack gap="md">
      {/* Features Card */}
      <Card variant="game" backdrop textured decorated>
        <Card.Header>
          <HStack gap="sm">
            <Sparkles className="text-game-gold h-5 w-5" />
            <GoldTitle>Začni své dobrodružství</GoldTitle>
          </HStack>
        </Card.Header>
        <Card.Content>
          <VStack gap="md">
            <P color="copper">Registrací získáš přístup do světa Machala, kde můžeš:</P>

            <VStack as="ul" gap="sm">
              <FeatureItem>Vytvořit svého hrdinu z 6 ras a povolání</FeatureItem>
              <FeatureItem>Bojovat s monstry a získávat legendární předměty</FeatureItem>
              <FeatureItem>Plnit questy a odhalovat příběh země Machala</FeatureItem>
              <FeatureItem>Rozvíjet dovednosti ve 3 větvích talentů</FeatureItem>
            </VStack>
          </VStack>
        </Card.Content>
      </Card>

      {/* Quote/Lore Card */}
      <Card variant="muted" backdrop="small">
        <Card.Content>
          <VStack align="center" fullWidth p="md">
            <MutedText italic align="center">
              {heroText}
            </MutedText>
          </VStack>
        </Card.Content>
      </Card>
    </VStack>
  )
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <HStack as="li" align="start" gap="sm">
      <Span color="gold">•</Span>
      <P color="copper">{children}</P>
    </HStack>
  )
}
