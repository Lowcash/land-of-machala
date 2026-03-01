import { ShieldCheck } from 'lucide-react'

import { getStatIcon } from '@/lib/game/origins/utils'

import { ScrollArea } from '@/components/ui/core/scroll-area'
import { VStack } from '@/components/ui/core/stack'
import { StatusIcon } from '@/components/ui/icons'
import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'
import { FeatureGrid } from '@/components/ui/prefabs/structure'
import { Description } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

import { StatRow } from './stat-row'
import type { CharacterStats, CreationUiLabels } from './types'

interface CharacterStatsCardProps {
  stats: CharacterStats
  isReady?: boolean
  statLabels: Record<string, string>
  uiLabels: CreationUiLabels
  raceBonuses?: string
  classBonuses?: string
}

export function CharacterStatsCard({
  stats,
  isReady,
  statLabels,
  uiLabels,
  raceBonuses,
  classBonuses,
}: CharacterStatsCardProps) {
  return (
    <NarrativeCard variant="subtle" direction="col">
      <NarrativeCard.Header align="center" justify="center">
        <NarrativeCard.Title align="center" variant="large">
          {uiLabels.statsTitle}
        </NarrativeCard.Title>
        {isReady && <StatusIcon icon={ShieldCheck} />}
      </NarrativeCard.Header>

      <NarrativeCard.Content height="full" p="none">
        <ScrollArea height="full" minHeight="zero" p="md" showGradient>
          <FeatureGrid variant="dense">
            <StatRow
              variant="large"
              icon={getStatIcon('hp')}
              label={statLabels.hp}
              value={stats.hp}
              color="hp"
            />
            <StatRow
              variant="large"
              icon={getStatIcon('mana')}
              label={statLabels.mana}
              value={stats.mana}
              color="mana"
            />
            <StatRow
              variant="large"
              icon={getStatIcon('strength')}
              label={statLabels.strength}
              value={stats.strength}
              color="strength"
            />
            <StatRow
              variant="large"
              icon={getStatIcon('intelligence')}
              label={statLabels.intelligence}
              value={stats.intelligence}
              color="intelligence"
            />
            <StatRow
              variant="large"
              icon={getStatIcon('agility')}
              label={statLabels.agility}
              value={stats.agility}
              color="agility"
            />
            <StatRow
              variant="large"
              icon={getStatIcon('stamina')}
              label={statLabels.stamina}
              value={stats.stamina}
              color="stamina"
            />
          </FeatureGrid>

          {/* If we have bonuses that don't fit into a specific stat, show them as a special row or text */}
          {(raceBonuses || classBonuses) && (
            <VStack gap="md" p="md" fullWidth>
              <Divider variant="solid" />
              {raceBonuses && (
                <Description align="left" variant="bonus">
                  {raceBonuses}
                </Description>
              )}
              {classBonuses && (
                <Description align="left" variant="bonus">
                  {classBonuses}
                </Description>
              )}
            </VStack>
          )}
        </ScrollArea>
      </NarrativeCard.Content>
    </NarrativeCard>
  )
}
