import { Brain, Shield, Sword, Wind } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Box } from '@/components/ui/core/box'
import { Card } from '@/components/ui/core/card'
import { HStack, Stack, VStack } from '@/components/ui/core/stack'
import { Tooltip } from '@/components/ui/core/tooltip'
import { type IconColor } from '@/components/ui/icons'
import { Portrait, StatGrid } from '@/components/ui/prefabs/game'
import { CurrencyIndicator, LocationIndicator } from '@/components/ui/prefabs/game/indicator'
import { VitalsBar } from '@/components/ui/prefabs/game/vitals-bar'
import { OrnamentalCorners } from '@/components/ui/prefabs/structure'
import { Value } from '@/components/ui/prefabs/typography/shared'
import { Divider } from '@/components/ui/shared/divider'

interface StatDefinition {
  icon: import('lucide-react').LucideIcon
  label: string
  value: string | number
  color: IconColor
}

export interface CharacterBoxProps {
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

/**
 * CharacterBox component displaying essential character vitals, portrait and stats.
 * Adheres to "Rule of Zero" by using design tokens and layout primitives.
 */
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
  compact,
}: CharacterBoxProps) {
  const statItems: StatDefinition[] = stats
    ? [
        { icon: Sword, label: 'STR', value: stats.strength, color: 'strength' },
        { icon: Brain, label: 'INT', value: stats.intelligence, color: 'intelligence' },
        { icon: Wind, label: 'AGI', value: stats.agility, color: 'agility' },
        { icon: Shield, label: 'STA', value: stats.stamina, color: 'stamina' },
      ]
    : []

  // If compact is explicitly passed, we follow it.
  // If not, we use responsive CSS-based logic (autoCompact).
  const isAuto = compact === undefined
  const forceCompact = compact === true

  return (
    <Card
      variant={isEnemy ? 'secondary' : 'ornamental'}
      p="none"
      minWidth="zero"
      fullWidth
      position="relative"
      overflow="hidden"
    >
      <OrnamentalCorners isEnemy={isEnemy} />

      <VStack gap="none" fullWidth fullHeight justify="between" position="relative" zIndex="10">
        {/* Main Body Area */}
        <VStack gap="none" fullWidth>
          <HStack
            p={forceCompact ? 'xxs' : 'xs'}
            gap={forceCompact ? 'xxs' : 'xs'}
            md={forceCompact ? undefined : { p: 'xs', gap: 'xs' }}
            align="start"
            fullWidth
            minWidth="zero"
          >
            {/* Avatar Section */}
            <Box display={isAuto ? 'block' : forceCompact ? 'block' : 'none'} md={isAuto ? { display: 'none' } : undefined}>
              <Portrait
                name={name}
                image={image}
                level={level}
                size="avatar-sm"
                isEnemy={isEnemy}
              />
            </Box>
            <Box display={isAuto ? 'none' : forceCompact ? 'none' : 'block'} md={isAuto ? { display: 'block' } : undefined}>
              <Portrait
                name={name}
                image={image}
                level={level}
                size="avatar"
                isEnemy={isEnemy}
              />
            </Box>

            {/* Bio & Vitals Section */}
            <VStack flex="1" gap="none" md={{ gap: 'xs' }} minWidth="zero">
              <HStack align="center" justify="between" fullWidth minWidth="zero">
                <Box fullWidth minWidth="zero" flex="1">
                  <Tooltip content={name} side="top" align="start">
                    <Value truncate bold font="medieval" variant={forceCompact ? 'primary' : 'large'}>
                      {name}
                    </Value>
                  </Tooltip>
                </Box>
              </HStack>

              <VStack gap="xs" fullWidth>
                <VitalsBar
                  label="Health"
                  value={hp}
                  max={hpMax}
                  variant="hp"
                  compact={forceCompact}
                  autoCompact={isAuto}
                />
                <VitalsBar
                  label={resourceType === 'energy' ? 'Energy' : 'Mana'}
                  value={resource}
                  max={resourceMax}
                  variant={resourceType}
                  compact={forceCompact}
                  autoCompact={isAuto}
                />
                {!isEnemy && xp !== undefined && xpMax !== undefined && !forceCompact ? (
                  <VitalsBar
                    label="Progress"
                    value={xp}
                    max={xpMax}
                    variant="xp"
                    compact={forceCompact}
                    autoCompact={isAuto}
                  />
              ) : (
                // Vertical Symmetry Spacer (Perfectly matches VitalsBar height)
                !forceCompact && (
                  <VitalsBar
                    label="Progress"
                    value={0}
                    max={100}
                    variant="xp"
                    invisible
                    compact={forceCompact}
                    autoCompact={isAuto}
                  />
                )
              )}
              </VStack>
            </VStack>
          </HStack>

          {/* Stats Strip - Prominent bottom strip with separator */}
          <Divider variant="solid" />
          <StatGrid
            items={statItems}
            compact={forceCompact}
            autoCompact={isAuto}
            unstyled
          />
        </VStack>

        {/* Footer Area hidden for now */}
      </VStack>
    </Card>
  )
}
