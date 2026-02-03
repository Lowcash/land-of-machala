import { Castle, Home, MapPin, Mountain, Skull, Trees } from 'lucide-react'

import { DecorativeGrid, FloatingTag, GameMarker } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { Caption, Span } from '@/components/ui/typography'

import type { Location, LocationType } from '../Shared/types'
import { MapMarker } from './MapMarker'

interface QuestMarker {
  locationId: string
  type: 'giver' | 'turnin'
  questId: string
}

interface MapCanvasProps {
  locations: Location[]
  playerPosition: { x: number; y: number }
  selectedLocation: Location | null
  onSelectLocation: (location: Location) => void
  discoveredLocations?: string[]
  questMarkers?: QuestMarker[]
  deathLocation?: { x: number; y: number; expiresAt: string } | null
}

const MIN_X = 50
const MAX_X = 300
const MIN_Y = 30
const MAX_Y = 200

function getLocationIcon(type: LocationType) {
  switch (type) {
    case 'TOWN':
      return Home
    case 'DUNGEON':
      return Castle
    case 'WILDERNESS':
      return Trees
    case 'LANDMARK':
      return Mountain
    default:
      return MapPin
  }
}

function getLocationColor(type: LocationType | string) {
  switch (type) {
    case 'TOWN':
      return 'text-game-gold'
    case 'DUNGEON':
      return 'text-game-danger'
    case 'WILDERNESS':
      return 'text-game-success'
    case 'LANDMARK':
      return 'text-game-magic'
    default:
      return 'text-game-gold-muted'
  }
}

export function MapCanvas({
  locations,
  playerPosition,
  selectedLocation,
  onSelectLocation,
  discoveredLocations = [],
  questMarkers = [],
  deathLocation,
}: MapCanvasProps) {
  // Convert absolute coordinates to percentage
  const toPercent = (x: number, y: number) => ({
    x: Math.max(0, Math.min(100, ((x - MIN_X) / (MAX_X - MIN_X)) * 100)),
    y: Math.max(0, Math.min(100, ((y - MIN_Y) / (MAX_Y - MIN_Y)) * 100)),
  })

  const playerPercent = toPercent(playerPosition.x, playerPosition.y)

  return (
    <VStack position="relative" fullWidth fullHeight p="lg" _internalClassName="select-none">
      {/* Decorative grid */}
      <DecorativeGrid opacity={0.1} size="50px" />

      {/* Coordinates Display */}
      <VStack position="absolute" top="2" right="2" z="top">
        <FloatingTag>
          <Span font="mono" size="xs" color="gold" _internalClassName="whitespace-nowrap">
            X: {playerPosition.x} Y: {playerPosition.y}
          </Span>
        </FloatingTag>
      </VStack>

      {/* Roads connecting to player position */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
        {locations.map((loc) => {
          const isDiscovered = discoveredLocations.includes(loc.id)
          if (!isDiscovered) return null

          const locPercent = toPercent(loc.positionX, loc.positionY)
          return (
            <line
              key={loc.id}
              x1={`${playerPercent.x}%`}
              y1={`${playerPercent.y}%`}
              x2={`${locPercent.x}%`}
              y2={`${locPercent.y}%`}
              stroke="currentColor"
              className="text-game-copper-muted"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity="0.3"
            />
          )
        })}
      </svg>

      {/* Player position marker */}
      <VStack
        position="absolute"
        h="8"
        w="8"
        z="50"
        _internalClassName="-mt-4 -ml-4"
        _internalStyle={{
          left: `${playerPercent.x}%`,
          top: `${playerPercent.y}%`,
        }}
      >
        <GameMarker icon={MapPin} color="player" glow />
        <VStack
          position="absolute"
          z="top"
          _internalClassName="-bottom-6 left-1/2 -translate-x-1/2"
        >
          <FloatingTag>
            <Caption font="fantasy" bold color="info">
              Jsi zde
            </Caption>
          </FloatingTag>
        </VStack>
      </VStack>

      {/* Loot Pile Marker */}
      {deathLocation && (
        <VStack
          position="absolute"
          h="8"
          w="8"
          z="40"
          _internalClassName="-mt-4 -ml-4 animate-bounce cursor-pointer"
          _internalStyle={{
            left: `${toPercent(deathLocation.x, deathLocation.y).x}%`,
            top: `${toPercent(deathLocation.x, deathLocation.y).y}%`,
          }}
          title={`Smrt - Expirace: ${new Date(deathLocation.expiresAt).toLocaleDateString()}`}
        >
          <GameMarker icon={Skull} color="danger" />
        </VStack>
      )}

      {/* Locations */}
      {locations.map((location) => (
        <MapMarker
          key={location.id}
          location={location}
          percent={toPercent(location.positionX, location.positionY)}
          isSelected={selectedLocation?.id === location.id}
          isDiscovered={discoveredLocations.includes(location.id)}
          isUnlocked={location.level <= 100}
          activeQuest={questMarkers.find((q) => q.locationId === location.id)}
          onSelect={onSelectLocation}
          getIcon={getLocationIcon}
          getColor={getLocationColor}
        />
      ))}
    </VStack>
  )
}
