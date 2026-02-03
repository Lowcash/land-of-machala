import { AlertCircle, HelpCircle, Lock, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Stack, VStack } from '@/components/ui/stack'
import { Span } from '@/components/ui/typography'

import type { Location, LocationType } from '../Shared/types'

interface MapMarkerProps {
  location: Location
  isSelected: boolean
  isDiscovered: boolean
  isUnlocked: boolean
  activeQuest?: { type: 'giver' | 'turnin' }
  onSelect: (location: Location) => void
  percent: { x: number; y: number }
  getIcon: (type: LocationType) => LucideIcon
  getColor: (type: LocationType | string) => string
}

export function MapMarker({
  location,
  isSelected,
  isDiscovered,
  isUnlocked,
  activeQuest,
  onSelect,
  percent,
  getIcon,
  getColor,
}: MapMarkerProps) {
  if (!isDiscovered) return null

  const Icon = getIcon(location.type)
  const color = getColor(location.type)

  return (
    <Button
      variant="marker"
      onClick={() => isUnlocked && onSelect(location)}
      disabled={!isUnlocked}
      title={location.name}
      style={{
        left: `${percent.x}%`,
        top: `${percent.y}%`,
        transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.25)' : 'scale(1)'}`,
        zIndex: isSelected ? 40 : 20,
        opacity: isUnlocked ? 1 : 0.4,
      }}
    >
      {isUnlocked && Icon ? (
        <Icon className={cn('h-6 w-6 shrink-0', color)} />
      ) : (
        <Lock className="text-game-copper-muted h-6 w-6 shrink-0" />
      )}

      {/* Quest Indicator */}
      {activeQuest && (
        <Stack position="absolute" top="-2" right="-2" z="top" _internalClassName="animate-bounce">
          {activeQuest.type === 'giver' ? (
            <AlertCircle className="text-game-gold h-5 w-5 fill-black" />
          ) : (
            <HelpCircle className="text-game-gold h-5 w-5 fill-black" />
          )}
        </Stack>
      )}

      {/* Level Badge */}
      {location.level > 1 && (
        <VStack
          position="absolute"
          right="-1"
          bottom="-1"
          h="5"
          w="5"
          align="center"
          justify="center"
          rounded="full"
          border="game"
          bg="danger"
        >
          <Span
            font="fantasy"
            weight="bold"
            _internalClassName="text-[10px] text-white leading-none"
          >
            {location.level}
          </Span>
        </VStack>
      )}

      {/* Name Tag */}
      <VStack
        position="absolute"
        top="full"
        mt="xs"
        px="xs"
        rounded="sm"
        bg="black-40"
        backdrop
        align="center"
        _internalClassName="whitespace-nowrap"
      >
        <Span
          font="fantasy"
          weight={isSelected ? 'bold' : 'normal'}
          color={isSelected ? 'gold' : 'gold-muted'}
          _internalClassName="text-[10px]"
        >
          {location.name}
        </Span>
      </VStack>
    </Button>
  )
}
