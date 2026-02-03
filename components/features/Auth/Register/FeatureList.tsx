import { Sparkles } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { HStack, VStack } from '@/components/ui/stack'
import { GoldTitle, P, Span } from '@/components/ui/typography'

export function FeatureList() {
  return (
    <Card variant="game">
      <VStack backdrop fullWidth>
        <Card.Header>
          <HStack align="center" gap="sm">
            <Sparkles className="text-game-gold h-5 w-5" />
            <GoldTitle align="left">Začni své dobrodružství</GoldTitle>
          </HStack>
        </Card.Header>
        <Card.Content>
          <VStack gap="md" fullWidth>
            <P color="gold-muted">Registrací získáš přístup do světa Machala, kde můžeš:</P>

            <VStack gap="sm" fullWidth>
              <FeatureItem>Vytvořit svého hrdinu z 6 ras a povolání</FeatureItem>
              <FeatureItem>Bojovat s monstry a získávat legendární předměty</FeatureItem>
              <FeatureItem>Plnit questy a odhalovat příběh země Machala</FeatureItem>
              <FeatureItem>Rozvíjet dovednosti ve 3 větvích talentů</FeatureItem>
            </VStack>
          </VStack>
        </Card.Content>
      </VStack>
    </Card>
  )
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <HStack align="start" gap="sm">
      <VStack mt="xs">
        <Span color="gold">•</Span>
      </VStack>
      <Span color="gold-muted">{children}</Span>
    </HStack>
  )
}
