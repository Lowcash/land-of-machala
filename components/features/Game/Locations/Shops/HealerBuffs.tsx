import { Zap } from 'lucide-react'

import type { Buff } from '@/lib/types/game'

import { Card } from '@/components/ui/card'
import { GameIcon } from '@/components/ui/display'
import { GameList } from '@/components/ui/game-list'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption } from '@/components/ui/typography'

interface HealerBuffsProps {
  activeBuffs: Buff[]
}

export function HealerBuffs({ activeBuffs }: HealerBuffsProps) {
  if (activeBuffs.length === 0) return null

  return (
    <Card variant="muted">
      <Card.Content>
        <VStack gap="sm">
          <Caption color="gold" bold uppercase>
            Aktivní požehnání
          </Caption>

          <GameList<Buff>
            data={activeBuffs}
            keyExtractor={(b) => b.name}
            renderItem={(buff) => (
              <HStack gap="sm" align="center">
                <GameIcon icon={Zap} color="gold" size="sm" />
                <Caption>
                  {buff.name} (+{buff.val} {buff.stat})
                </Caption>
              </HStack>
            )}
          />
        </VStack>
      </Card.Content>
    </Card>
  )
}
