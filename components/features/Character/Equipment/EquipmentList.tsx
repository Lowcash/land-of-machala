import { Shield } from 'lucide-react'

import { getSlotName } from '@/lib/game/utils'
import type { CharacterItem } from '@/lib/types/game'

import { DetailRow, GameIcon, StatDisplay } from '@/components/ui/display'
import { GameCard } from '@/components/ui/game-card'
import { GameList } from '@/components/ui/game-list'
import { HStack, VStack } from '@/components/ui/stack'
import { H4 } from '@/components/ui/typography'

interface EquipmentListProps {
  equipped: CharacterItem[]
}

export function EquipmentList({ equipped }: EquipmentListProps) {
  return (
    <GameCard title="Výbava" icon={Shield}>
      <GameList
        data={equipped}
        keyExtractor={(item) => item.id}
        emptyMessage="Žádná nasazená výbava"
        renderItem={(item) => {
          const Icon = item.icon || Shield
          return (
            <VStack
              position="relative"
              rounded="lg"
              border="game"
              bg="black-60"
              p="md"
              fullWidth
              _internalClassName="group transition-all hover:border-game-gold hover:bg-black-80 hover:shadow-[0_0_15px_var(--color-game-gold-muted)]"
            >
              <HStack align="center" gap="md" fullWidth>
                <GameIcon icon={Icon} color="gold" bgOpacity="20" />

                <VStack flex="1" _internalClassName="min-w-0" gap="xs">
                  <DetailRow
                    label={
                      <H4 color="copper" truncate>
                        {item.name}
                      </H4>
                    }
                    value={getSlotName(item.slot || '').toUpperCase()}
                    py="none"
                  />

                  <HStack align="center" gap="md" fullWidth>
                    {(item.attack || item.damage) && (
                      <StatDisplay
                        value={`+${item.attack || item.damage}`}
                        label="Útok"
                        color="danger"
                        size="sm"
                      />
                    )}
                    {item.defense && (
                      <StatDisplay
                        value={`+${item.defense}`}
                        label="Obrana"
                        color="cold"
                        size="sm"
                      />
                    )}
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          )
        }}
      />
    </GameCard>
  )
}
