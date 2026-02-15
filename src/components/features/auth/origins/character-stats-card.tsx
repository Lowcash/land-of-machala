import { Activity, Brain, Droplet, Heart, Sword, Wind } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card } from '@/components/ui/core/card'

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
  fullHeight?: boolean
  flex?: 'none' | '1' | 'auto' | null
}

export function CharacterStatsCard({ stats, fullHeight, flex }: CharacterStatsCardProps) {
  const t = useTranslations('Auth.Origins.creation')

  return (
    <Card p="md" fullHeight={fullHeight} flex={flex}>
      <Card.Header align="center" justify="center">
        <Card.Title align="center">{t('statsTitle')}</Card.Title>
      </Card.Header>

      <Card.Content
        display="grid"
        cols="2"
        gap="lg"
        sm={{ display: 'flex', direction: 'col', gap: 'md' }}
      >
        <StatRow
          icon={Heart}
          label="HP"
          value={stats.hp}
          iconColor="var(--color-stat-hp)"
          labelColor="var(--color-secondary)"
        />
        <StatRow
          icon={Droplet}
          label="Mana"
          value={stats.mana}
          iconColor="var(--color-stat-mana)"
          labelColor="var(--color-secondary)"
        />
        <StatRow
          icon={Sword}
          label="Síla"
          value={stats.strength}
          iconColor="var(--color-stat-strength)"
          labelColor="var(--color-secondary)"
        />
        <StatRow
          icon={Brain}
          label="Intel."
          value={stats.intelligence}
          iconColor="var(--color-stat-intelligence)"
          labelColor="var(--color-secondary)"
        />
        <StatRow
          icon={Wind}
          label="Obrat."
          value={stats.agility}
          iconColor="var(--color-stat-agility)"
          labelColor="var(--color-secondary)"
        />
        <StatRow
          icon={Activity}
          label="Výdrž"
          value={stats.stamina}
          iconColor="var(--color-stat-stamina)"
          labelColor="var(--color-secondary)"
        />
      </Card.Content>
    </Card>
  )
}
