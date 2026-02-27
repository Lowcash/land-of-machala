import { Activity, Brain, Droplet, Heart, ShieldCheck, Sword, Wind } from 'lucide-react'

import { StatusIcon } from '@/components/ui/icons'
import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'
import { FeatureGrid } from '@/components/ui/prefabs/structure'

import { StatRow } from './stat-row'
import type { CreationUiLabels } from './types'

interface CharacterStatsCardProps {
  stats: {
    hp: number
    mana: number
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  isReady?: boolean
  statLabels: Record<string, string>
  uiLabels: CreationUiLabels
}

export function CharacterStatsCard({
  stats,
  isReady,
  statLabels,
  uiLabels,
}: CharacterStatsCardProps) {
  return (
    <NarrativeCard variant="subtle" direction="col">
      <NarrativeCard.Header align="center" justify="center">
        <NarrativeCard.Title align="center" variant="large">
          {uiLabels.statsTitle}
        </NarrativeCard.Title>
        {isReady && <StatusIcon icon={ShieldCheck} />}
      </NarrativeCard.Header>

      <NarrativeCard.Content height="full" justify="between">
        <FeatureGrid>
          <StatRow icon={Heart} label={statLabels.hp} value={stats.hp} color="hp" />
          <StatRow icon={Droplet} label={statLabels.mana} value={stats.mana} color="mana" />
          <StatRow
            icon={Sword}
            label={statLabels.strength}
            value={stats.strength}
            color="strength"
          />
          <StatRow
            icon={Brain}
            label={statLabels.intelligence}
            value={stats.intelligence}
            color="intelligence"
          />
          <StatRow icon={Wind} label={statLabels.agility} value={stats.agility} color="agility" />
          <StatRow
            icon={Activity}
            label={statLabels.stamina}
            value={stats.stamina}
            color="stamina"
          />
        </FeatureGrid>
      </NarrativeCard.Content>
    </NarrativeCard>
  )
}
