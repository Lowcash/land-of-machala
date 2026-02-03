import { Scroll } from 'lucide-react'

import { GAME_CHANGELOG } from '@/lib/game/constants/changelog'

import { Card } from '@/components/ui/card'
import { HStack, VStack } from '@/components/ui/stack'
import { GoldTitle, Span } from '@/components/ui/typography'

/**
 * Changelog display for the authentication pages.
 * Lists recent updates to the game.
 */
export function Changelog() {
  return (
    <Card variant="game">
      <VStack backdrop bg="black-80" p="lg" fullWidth>
        <Card.Content>
          <VStack gap="lg" fullWidth>
            <HStack gap="sm" align="center">
              <Scroll className="text-game-gold h-5 w-5" />
              <GoldTitle>Nejnovější změny</GoldTitle>
            </HStack>

            <VStack gap="md" fullWidth>
              {GAME_CHANGELOG.map((update) => (
                <HStack key={update.id} align="start" gap="sm" fullWidth>
                  <Span color="gold" weight="bold" mt="none">
                    •
                  </Span>
                  <HStack gap="xs" wrap="wrap">
                    <Span color={update.color} bold>
                      {update.prefix}
                    </Span>
                    <Span color="copper">{update.text}</Span>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Card.Content>
      </VStack>
    </Card>
  )
}
