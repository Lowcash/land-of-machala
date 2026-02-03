import { Activity, Brain, Droplet, Heart, Sword, Wind } from 'lucide-react'

import { type classes, type races } from '@/lib/game/onboarding'

import { Card } from '@/components/ui/card'
import { DetailRow } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { Caption, GoldTitle } from '@/components/ui/typography'

type RaceData = (typeof races)[number]
type ClassData = (typeof classes)[number]

interface Stats {
  hp: number
  mana: number
  strength: number
  intelligence: number
  agility: number
  stamina: number
}

interface StatDisplayProps {
  race: RaceData
  classData: ClassData
  finalStats: Stats
}

export function StatsDisplay({ race, classData, finalStats }: StatDisplayProps) {
  // Mapping for consistent rendering
  const statConfig = [
    {
      key: 'hp',
      label: 'HP',
      icon: Heart,
      iconColor: 'text-game-danger',
    },
    {
      key: 'mana',
      label: 'Mana',
      icon: Droplet,
      iconColor: 'text-game-info',
    },
    {
      key: 'strength',
      label: 'Síla',
      icon: Sword,
      iconColor: 'text-game-copper',
    },
    {
      key: 'intelligence',
      label: 'Inteligence',
      icon: Brain,
      iconColor: 'text-game-magic',
    },
    {
      key: 'agility',
      label: 'Obratnost',
      icon: Wind,
      iconColor: 'text-game-gold',
    },
    {
      key: 'stamina',
      label: 'Výdrž',
      icon: Activity,
      iconColor: 'text-game-info',
    },
  ] as const

  return (
    <Card variant="dialog" fullWidth>
      <Card.Content>
        <VStack gap="md" fullWidth>
          <GoldTitle align="center">Tvé statistiky</GoldTitle>

          <VStack gap="xs" fullWidth>
            {statConfig.map((stat) => (
              <DetailRow
                key={stat.key}
                label={stat.label}
                value={finalStats[stat.key as keyof Stats]}
                icon={stat.icon}
                iconColor={stat.iconColor}
              />
            ))}
          </VStack>

          {/* Race/Class Bonus Description */}
          <VStack border="game-t" pt="md" align="center" gap="xs" fullWidth>
            <Caption color="copper" italic>
              {race.bonuses}
            </Caption>
            <VStack opacity="80">
              <Caption color="gold" italic>
                {classData.bonuses}
              </Caption>
            </VStack>
          </VStack>
        </VStack>
      </Card.Content>
    </Card>
  )
}
