import { Shield, Swords } from 'lucide-react'

import { calculateCritChance, calculateDodgeChance } from '@/lib/game/formulas'
import type { CharacterData } from '@/lib/types/game'
import { cn } from '@/lib/utils'

import { Divider, SectionHeader } from '@/components/ui/display'
import { GameCard } from '@/components/ui/game-card'
import { GameGrid } from '@/components/ui/game-grid'
import { HStack, VStack } from '@/components/ui/stack'
import { StatRow } from '@/components/ui/stat-row'

import { AttributesPanel } from './AttributesPanel'

export function StatsPanel({
  character,
  totalAttack,
  totalDefense,
}: {
  character: CharacterData
  totalAttack: number
  totalDefense: number
}) {
  // Calculate derived stats
  const critChance = calculateCritChance(character.agility)
  const dodgeChance = calculateDodgeChance(character.agility)

  // Use character talent points or default to 0
  const talentPoints = character.talentPoints ?? 0

  // Default stats if missing
  const stats = character.stats || { strength: 0, intelligence: 0, agility: 0, stamina: 0 }

  return (
    <GameCard>
      <VStack p="sm" gap="md" fullWidth>
        {/* Attributes Panel (Optimistic) */}
        <AttributesPanel stats={stats} talentPoints={talentPoints} />

        <VStack fullWidth py="sm">
          <Divider className="opacity-50" />
        </VStack>

        {/* Combat Stats */}
        <VStack gap="sm" fullWidth>
          <HStack align="center" gap="sm">
            <Swords className="text-game-gold h-4 w-4" />
            <SectionHeader align="left" color="gold">
              Bojové statistiky
            </SectionHeader>
          </HStack>
          <GameGrid columns={{ default: 2 }} fullHeight={false}>
            <StatRow label="Útok" value={totalAttack} valueColor="danger" />
            <StatRow label="Obrana" value={totalDefense} valueColor="cold" />
            <StatRow label="Crit" value={critChance} suffix="%" />
            <StatRow label="Dodge" value={dodgeChance} suffix="%" />
          </GameGrid>
        </VStack>

        <VStack fullWidth py="sm">
          <Divider className="opacity-50" />
        </VStack>

        {/* Resistances */}
        <VStack gap="sm" fullWidth>
          <HStack align="center" gap="sm">
            <Shield className="text-game-gold h-4 w-4" />
            <SectionHeader align="left" color="gold">
              Odolnosti
            </SectionHeader>
          </HStack>
          <GameGrid columns={{ default: 2 }} fullHeight={false}>
            {[
              { label: 'Fyzická', value: character.physicalResistance, color: 'copper' as const },
              { label: 'Magická', value: character.magicalResistance, color: 'magic' as const },
              { label: 'Oheň', value: character.fireResistance, color: 'danger' as const },
              { label: 'Chlad', value: character.coldResistance, color: 'cold' as const },
              {
                label: 'Jed',
                value: character.poisonResistance,
                color: 'nature' as const,
                fullWidth: true,
              },
            ].map((res) => (
              <VStack
                key={res.label}
                _internalClassName={cn(res.fullWidth ? 'col-span-2' : '')}
                fullWidth
              >
                <StatRow label={res.label} value={res.value} suffix="%" valueColor={res.color} />
              </VStack>
            ))}
          </GameGrid>
        </VStack>
      </VStack>
    </GameCard>
  )
}
