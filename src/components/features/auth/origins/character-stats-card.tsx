import { Activity, Brain, Droplet, Heart, ShieldCheck, Sword, Wind } from 'lucide-react'

import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/stack'
import { StatusIcon } from '@/components/ui/icons'

import { StatRow } from './stat-row'

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
  uiLabels: any
}

export function CharacterStatsCard({
  stats,
  isReady,
  statLabels,
  uiLabels,
}: CharacterStatsCardProps) {
  return (
    <Card p="md" md={{ p: 'lg' }} flex="1" variant="subtle">
      <Card.Header align="center" justify="center" gap="sm">
        <Card.Title align="center">{uiLabels.statsTitle}</Card.Title>
        {isReady && <StatusIcon icon={ShieldCheck} />}
      </Card.Header>

      <Card.Content gap="sm" height="full" justify="between">
        <Stack
          display="grid"
          cols="1"
          gap="sm"
          sm={{ cols: '2', gap: 'md' }}
          md={{ cols: '2', gap: 'md' }}
          lg={{ cols: '2', gap: 'md' }}
          flex="none"
        >
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
        </Stack>
      </Card.Content>
    </Card>
  )
}
