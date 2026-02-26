import { Brain, Shield, Sword, Wind } from 'lucide-react'

import { Badge } from '@/components/ui/core/badge'
import { Card } from '@/components/ui/core/card'
import { HStack, Stack, VStack } from '@/components/ui/core/stack'
import { Tooltip } from '@/components/ui/core/tooltip'
import { Icon, type IconColor } from '@/components/ui/icons'
import { Avatar } from '@/components/ui/prefabs/game/avatar'
import { CurrencyIndicator, LocationIndicator } from '@/components/ui/prefabs/game/indicator'
import { VitalsBar } from '@/components/ui/prefabs/game/vitals-bar'
import { Label, Value } from '@/components/ui/prefabs/typography/shared'

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
        <VStack gap="none" fullWidth>
          {/* Main Body */}
          <HStack p={compact ? 'xxs' : 'md'} gap={compact ? 'sm' : 'md'} align="start" fullWidth>
            {/* Avatar Section */}
            <Stack position="relative">
              <Avatar image={image} name={name} size={compact ? 'avatar-xs' : 'avatar'} />
              <Stack position="absolute" inset={compact ? 'xs' : 'base'} rounded="full">
                <Badge size={compact ? 'sm' : 'md'} variant={isEnemy ? 'danger' : 'primary'}>
                  {level}
                </Badge>
              </Stack>
            </Stack>

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
                    {!compact && <Stack height="vitals-label" fullWidth />}
                    <Stack height={compact ? 'vitals-progress' : 'vitals-progress-md'} fullWidth />
                  </VStack>
                )}
              </VStack>
            </VStack>
          </HStack>

          {/* Stats Strip */}
          {statItems.length > 0 && (
            <VStack gap="none" fullWidth>
              {/* Divider using a Stack */}
              <Stack height="px" fullWidth bgColor="secondary" opacity="10" />
              <HStack display="grid" cols="4" gap="none" fullWidth py={compact ? 'xxs' : 'xs'}>
                {statItems.map((stat) => (
                  <Tooltip key={stat.label} content={stat.label} side="bottom">
                    <VStack align="center" justify="center" p="none">
                      {!compact && (
                        <Label variant="tiny" color="secondary">
                          {stat.label}
                        </Label>
                      )}
                      <HStack gap="xxs" align="center">
                        <Icon icon={stat.icon} size={compact ? 'xs' : 'stat'} color={stat.color} />
                        <Value variant="tiny" bold={compact} tabularNums>
                          {stat.value}
                        </Value>
                      </HStack>
                    </VStack>
                  </Tooltip>
                ))}
              </HStack>
            </VStack>
          )}
        </VStack>

        {/* Footer info (Location/Gold) or Spacer for symmetry */}
        {!compact && (
          <VStack gap="none" fullWidth>
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
          </VStack>
        )}
      </VStack>
    </Card>
  )
}
