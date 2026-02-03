import Link from 'next/link'

import { AlertCircle, HelpCircle, MapPin, Skull } from 'lucide-react'

import { cn } from '@/lib/utils'

import { GameMarker } from '@/components/ui/display'
import { GameGrid } from '@/components/ui/game-grid'
import { VStack } from '@/components/ui/stack'
import { P } from '@/components/ui/typography'

import type { Location, QuestMarker } from '../Shared/types'

interface MapGridProps {
  locations: Location[]
  discoveredLocations: string[]
  questMarkers: QuestMarker[]
  deathLocation?: { x: number; y: number } | null
  currentLocationId: string
  selectedLocationId: string | null
}

export function MapGrid({
  locations,
  discoveredLocations,
  questMarkers,
  deathLocation,
  currentLocationId,
  selectedLocationId,
}: MapGridProps) {
  const discoveredSet = new Set(discoveredLocations)

  return (
    <GameGrid variant="map" columns={{ default: 10, md: 12 }}>
      {locations.map((loc) => {
        const isCurrent = loc.id === currentLocationId
        const isSelected = loc.id === selectedLocationId
        const isDiscovered = discoveredSet.has(loc.id)

        // Find quest markers for this location
        const marker = questMarkers.find((m) => m.locationId === loc.id)

        // Check if death happened here
        const isDeathLoc =
          deathLocation && deathLocation.x === loc.positionX && deathLocation.y === loc.positionY

        return (
          <Link
            key={loc.id}
            href={isSelected ? '?' : `?locationId=${loc.id}`}
            className={cn(
              'group relative flex aspect-square h-auto items-center justify-center rounded-lg border-2 p-0 transition-all duration-300',
              isCurrent
                ? 'border-game-gold bg-game-gold/10 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                : isSelected
                  ? 'border-game-gold-muted bg-game-gold-muted/10'
                  : 'border-game-gold-muted/30 hover:border-game-gold-muted/60 bg-black/40',
              !isDiscovered && 'opacity-50 grayscale'
            )}
          >
            {/* Quest Markers */}
            {marker && (
              <VStack position="absolute" top="-1" right="-1" z="10">
                <GameMarker
                  icon={marker.type === 'giver' ? AlertCircle : HelpCircle}
                  color={marker.type === 'giver' ? 'gold' : 'info'}
                  size="sm"
                />
              </VStack>
            )}

            {/* Death Marker */}
            {isDeathLoc && (
              <VStack position="absolute" bottom="-1" left="-1" z="10">
                <GameMarker icon={Skull} color="danger" size="sm" />
              </VStack>
            )}

            {isCurrent && (
              <VStack position="absolute" inset="0" align="center" justify="center" z="10">
                <GameMarker icon={MapPin} color="player" glow size="sm" />
              </VStack>
            )}
          </Link>
        )
      })}

      {locations.length === 0 && (
        <VStack fullWidth h="full" align="center" justify="center" p="xl" mt="xl">
          <P color="muted" italic>
            Mapa se prozkoumává...
          </P>
        </VStack>
      )}
    </GameGrid>
  )
}
