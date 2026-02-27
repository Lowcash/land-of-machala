import { Brain, Shield, Sword, Wind } from 'lucide-react'

import { Card } from '@/components/ui/core/card'
import { HStack, Stack, VStack } from '@/components/ui/core/stack'
import { Tooltip } from '@/components/ui/core/tooltip'
import { type IconColor } from '@/components/ui/icons'
import { Portrait, StatGrid } from '@/components/ui/prefabs/game'
import { CurrencyIndicator, LocationIndicator } from '@/components/ui/prefabs/game/indicator'
import { VitalsBar } from '@/components/ui/prefabs/game/vitals-bar'
import { FeatureSection } from '@/components/ui/prefabs/structure'
import { Value } from '@/components/ui/prefabs/typography/shared'

interface StatDefinition {
  icon: import('lucide-react').LucideIcon
  label: string
  value: number
  color: IconColor
}

interface CharacterBoxProps {
  name: string
  level: number
  hp: number
  hpMax: number
  resource: number
  resourceMax: number
  resourceType?: 'mana' | 'energy'
  xp?: number
  xpMax?: number
  image?: string
  gold?: number
  location?: string
  isEnemy?: boolean
  stats?: {
    strength: number
    intelligence: number
    agility: number
    stamina: number
  }
  compact?: boolean
}

export function CharacterBox({
  name,
  level,
  hp,
  hpMax,
  resource,
  resourceMax,
  resourceType = 'mana',
  xp,
  xpMax,
  image,
  gold,
  location,
  isEnemy = false,
  stats,
  compact = false,
}: CharacterBoxProps) {
  const statItems: StatDefinition[] = stats
    ? [
        { icon: Sword, label: 'STR', value: stats.strength, color: 'strength' },
        { icon: Brain, label: 'INT', value: stats.intelligence, color: 'intelligence' },
        { icon: Wind, label: 'AGI', value: stats.agility, color: 'agility' },
        { icon: Shield, label: 'STA', value: stats.stamina, color: 'stamina' },
      ]
    : []

  return (
    <Card
      variant={isEnemy ? 'secondary' : 'ornamental'}
      p="none"
      minWidth="zero"
      minHeight={compact ? 'none' : 'character'}
      maxWidth="full"
      sm={{ maxWidth: 'md' }}
      fullWidth
    >
      <VStack gap="none" fullWidth fullHeight justify="between">
        <FeatureSection>
          {/* Main Body */}
          <HStack p={compact ? 'xxs' : 'md'} gap={compact ? 'sm' : 'md'} align="start" fullWidth>
            {/* Avatar Section */}
            <Portrait
              name={name}
              image={image}
              level={level}
              size={compact ? 'avatar-xs' : 'avatar'}
              isEnemy={isEnemy}
            />

            {/* Bio & Vitals Section */}
            <VStack flex="1" gap={compact ? 'none' : 'sm'} minWidth="zero">
              <HStack
                align="baseline"
                justify="between"
                fullWidth
                pt={compact ? 'xs' : 'none'}
                minWidth="zero"
              >
                <VStack flex="1" minWidth="zero">
                  <Tooltip content={name} side="top" align="start">
                    <Value truncate bold font="medieval" variant={compact ? 'small' : 'large'}>
                      {name}
                    </Value>
                  </Tooltip>
                </VStack>
              </HStack>

              <VStack gap="xs" fullWidth>
                <VitalsBar label="Health" value={hp} max={hpMax} variant="hp" compact={compact} />
                <VitalsBar
                  label={resourceType === 'energy' ? 'Energy' : 'Mana'}
                  value={resource}
                  max={resourceMax}
                  variant={resourceType}
                  compact={compact}
                />
                {!isEnemy && xp !== undefined && xpMax !== undefined ? (
                  <VitalsBar
                    label="Progress"
                    value={xp}
                    max={xpMax}
                    variant="xp"
                    compact={compact}
                  />
                ) : (
                  /* Spacer to maintain height symmetry when XP is missing */
                  <VStack gap={compact ? 'none' : 'xs'} fullWidth>
                    {!compact && <VStack height="vitals-label" fullWidth />}
                    <VStack height={compact ? 'vitals-progress' : 'vitals-progress-md'} fullWidth />
                  </VStack>
                )}
              </VStack>
            </VStack>
          </HStack>

          {/* Stats Strip */}
          <StatGrid items={statItems} compact={compact} />
        </FeatureSection>

        {/* Footer info (Location/Gold) or Spacer for symmetry */}
        {!compact && (
          <FeatureSection>
            {!isEnemy && (location || gold !== undefined) ? (
              <>
                <Stack height="px" fullWidth bgColor="secondary" opacity="10" />
                <HStack
                  p="xs"
                  px="md"
                  justify="between"
                  fullWidth
                  height="vitals-footer"
                  align="center"
                >
                  {location ? <LocationIndicator label={location} size="xs" /> : <Stack />}
                  {gold !== undefined && <CurrencyIndicator amount={gold} />}
                </HStack>
              </>
            ) : (
              <Stack height="vitals-footer" fullWidth />
            )}
          </FeatureSection>
        )}
      </VStack>
    </Card>
  )
}
