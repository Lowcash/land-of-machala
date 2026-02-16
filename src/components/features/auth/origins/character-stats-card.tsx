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
}

export function CharacterStatsCard({ stats }: CharacterStatsCardProps) {
  const t = useTranslations('Auth.Origins.creation')
  const gt = useTranslations('Game')

  return (
    <Card p="md" fullHeight>
      <Card.Header align="center" justify="center">
        <Card.Title align="center">{t('statsTitle')}</Card.Title>
      </Card.Header>

      <Card.Content
        display="grid"
        cols="2"
        gap="lg"
        sm={{ display: 'flex', direction: 'col', gap: 'md' }}
      >
        <StatRow icon={Heart} label={gt('Stats.hp')} value={stats.hp} color="hp" />
        <StatRow icon={Droplet} label={gt('Stats.mana')} value={stats.mana} color="mana" />
        <StatRow icon={Sword} label={gt('Stats.strength')} value={stats.strength} color="strength" />
        <StatRow icon={Brain} label={gt('Stats.intelligence')} value={stats.intelligence} color="intelligence" />
        <StatRow icon={Wind} label={gt('Stats.agility')} value={stats.agility} color="agility" />
        <StatRow icon={Activity} label={gt('Stats.stamina')} value={stats.stamina} color="stamina" />
      </Card.Content>
    </Card>
  )
}
