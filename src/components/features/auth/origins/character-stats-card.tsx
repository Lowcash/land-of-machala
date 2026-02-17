'use client'

import { Activity, Brain, Droplet, Heart, ShieldCheck, Sword, Wind } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card } from '@/components/ui/core/card'
import { Stack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

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
    <Card p="md" variant="primary" flex="1">
      <Card.Header align="center" justify="center">
        <Card.Title align="center">{t('statsTitle')}</Card.Title>
      </Card.Header>

      <Card.Content
        display="flex"
        direction="col"
        gap="sm"
        height="full"
        justify="between"
        py="sm"
      >
        <Stack
          display="grid"
          cols="1"
          gap="sm"
          sm={{ cols: '2', gap: 'md' }}
          md={{ cols: '2', gap: 'sm' }}
          lg={{ cols: '2', gap: 'sm' }}
          flex="none"
        >
        <StatRow icon={Heart} label={gt('Stats.hp')} value={stats.hp} color="hp" />
        <StatRow icon={Droplet} label={gt('Stats.mana')} value={stats.mana} color="mana" />
        <StatRow
          icon={Sword}
          label={gt('Stats.strength')}
          value={stats.strength}
          color="strength"
        />
        <StatRow
          icon={Brain}
          label={gt('Stats.intelligence')}
          value={stats.intelligence}
          color="intelligence"
        />
        <StatRow icon={Wind} label={gt('Stats.agility')} value={stats.agility} color="agility" />
        <StatRow
          icon={Activity}
          label={gt('Stats.stamina')}
          value={stats.stamina}
          color="stamina"
        />
        </Stack>

        <VStack align="center" gap="none" pt="xs" flex="none">
          <ShieldCheck size={14} className="text-(--color-primary)/60" />
          <Text variant="small" color="secondary" font="fantasy" className="scale-90 opacity-60">
            {t('ready_to_start', { defaultValue: 'Ready for the Journey' })}
          </Text>
        </VStack>
      </Card.Content>
    </Card>
  )
}
