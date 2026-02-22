import { Card } from '@/components/ui/core/card'
import { HStack, VStack, Stack } from '@/components/ui/core/stack'
import { Avatar } from '@/components/ui/prefabs/game/avatar'
import { Badge } from '@/components/ui/core/badge'
import { Tooltip } from '@/components/ui/core/tooltip'
import { Value, Label } from '@/components/ui/prefabs/typography/shared'
import { VitalsBar } from '@/components/ui/prefabs/game/vitals-bar'
import { LocationIndicator, CurrencyIndicator } from '@/components/ui/prefabs/game/indicator'
import { Icon } from '@/components/ui/icons'
import type { LucideIcon } from 'lucide-react'

export interface CharacterBoxProps {
  name: string
  level: number
  image: string
  hp: { current: number; max: number }
  mana?: { current: number; max: number }
  energy?: { current: number; max: number }
  xp?: { current: number; max: number }
  location?: string
  gold?: number
  isEnemy?: boolean
  compact?: boolean
  longName?: string
  stats?: Array<{
    label: string
    value: string | number
    icon: LucideIcon
    color?: 'primary' | 'secondary' | 'hp' | 'mana' | 'energy' | 'strength' | 'intelligence' | 'agility' | 'stamina' | 'gold'
  }>
}

export function CharacterBox({
  name,
  level,
  image,
  hp,
  mana,
  energy,
  xp,
  location,
  gold,
  isEnemy = false,
  compact: explicitCompact,
  longName,
  stats = [],
}: CharacterBoxProps) {
  // Logic: explicitCompact takes precedence, otherwise we use responsive props to hide/show
  // but we still want a base "mobile-first" compact look that expands.

  return (
    <Card
      variant={isEnemy ? 'secondary' : 'ornamental'}
      p="none"
      minWidth="zero"
      maxWidth="full"
      fullWidth
    >
      <VStack gap="none" fullWidth fullHeight justify="between">
        <VStack gap="none" fullWidth>
          <HStack
            p="xxs"
            gap="sm"
            sm={{ p: 'md', gap: 'md' }}
            align="start"
            fullWidth
            minWidth="zero"
          >
            {/* Avatar Section */}
            <Stack
              flex="none"
              height="avatar-xs"
              width="avatar-xs"
              sm={{ height: 'avatar', width: 'avatar' }}
              position="relative"
            >
              <Avatar
                image={image}
                name={name}
                size="avatar-xs"
                sm={{ size: 'avatar' }}
              />
              <Stack position="absolute" top="-1" left="-1" rounded="full" shadow="base" border="base" borderColor="primary">
                <Badge size="sm" sm={{ size: 'md' }} variant={isEnemy ? 'danger' : 'primary'}>
                  {level}
                </Badge>
              </Stack>
            </Stack>

            {/* Info Section */}
            <VStack gap="xxs" flex="1" minWidth="zero" py="xxs">
              <HStack justify="between" align="baseline" gap="xs" fullWidth minWidth="zero">
                <Value font="fantasy" color={isEnemy ? 'danger' : 'gold'} truncate>
                  {longName || name}
                </Value>
                <Stack display="none" sm={{ display: 'flex' }}>
                  <Label variant="tiny" color="secondary" shrink>
                    Lv.{level}
                  </Label>
                </Stack>
              </HStack>

              <VStack gap="xs" fullWidth>
                <VitalsBar 
                  label="HP" 
                  type="hp" 
                  current={hp.current} 
                  max={hp.max} 
                  size="sm" 
                  sm={{ size: 'md' }}
                  showValue 
                  compact // compact means value is hidden, but VitalsBar's compact logic is inverted? 
                  // Let's check VitalsBar. In VitalsBar: !compact && showValue renders label row.
                  // So compact={true} hides labels. We want labels on desktop.
                />
                
                {/* We use responsive visibility for labels by passing props to VitalsBar if it supports them, 
                    OR we just wrap them. But VitalsBar is a prefab. 
                    Let's update VitalsBar to be more responsive as well. 
                */}

                {mana && (
                  <VitalsBar label="MP" type="mana" current={mana.current} max={mana.max} size="sm" sm={{ size: 'md' }} />
                )}
                {energy && (
                  <VitalsBar label="EN" type="energy" current={energy.current} max={energy.max} size="sm" sm={{ size: 'md' }} />
                )}
                {xp && !isEnemy && (
                  <VitalsBar label="XP" type="xp" current={xp.current} max={xp.max} size="sm" />
                )}
              </VStack>
            </VStack>
          </HStack>

          {/* Location & Gold Bar (only if available) */}
          {(location || gold !== undefined) && (
            <HStack 
              px="xs" 
              py="xxs" 
              gap="sm" 
              fullWidth 
              justify="between" 
              align="center"
              sm={{ py: 'xs', px: 'md' }}
            >
              <HStack gap="xs" align="center" flex="1" minWidth="zero">
                {location && <LocationIndicator label={location} size="sm" />}
              </HStack>
              {gold !== undefined && <CurrencyIndicator amount={gold} />}
            </HStack>
          )}

          {/* Stats Strip */}
          {stats.length > 0 && (
            <VStack gap="none" fullWidth>
              <Stack height="px" fullWidth bgColor="secondary" opacity="10" />
              <HStack
                display="grid"
                cols="4"
                fullWidth
                gap="none"
                align="center"
                py="px"
                sm={{ py: 'xs' }}
              >
                {stats.map((stat) => (
                  <VStack key={stat.label} align="center" gap="none" p="px">
                    <HStack gap="xxs" align="center">
                      <Icon icon={stat.icon} size="stat" color={stat.color as any || 'secondary'} />
                      <Stack display="none" sm={{ display: 'flex' }}>
                        <Label variant="tiny" color="secondary">
                          {stat.label}
                        </Label>
                      </Stack>
                    </HStack>
                    <Value variant="tiny" tabularNums>
                      {stat.value}
                    </Value>
                  </VStack>
                ))}
              </HStack>
            </VStack>
          )}
        </VStack>
      </VStack>
    </Card>
  )
}
