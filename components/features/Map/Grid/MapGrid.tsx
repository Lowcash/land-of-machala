import Link from 'next/link'

import { AlertCircle, HelpCircle, Skull } from 'lucide-react'

import { cn } from '@/lib/utils'

import { GameGrid } from '@/components/ui/game-grid'

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
    <GameGrid columns={{ default: 10, md: 12 }} containerClassName="bg-[#0c0c0c]" className="p-4">
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
                ? 'border-[#ffd700] bg-[#ffd700]/10 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                : isSelected
                  ? 'border-[#d4a574] bg-[#d4a574]/10'
                  : 'border-[#8b6f47]/30 bg-black/40 hover:border-[#d4a574]/60',
              !isDiscovered && 'opacity-50 grayscale'
            )}
          >
            {/* Quest Markers */}
            {marker && (
              <div className="absolute -top-1 -right-1 z-10">
                {marker.type === 'giver' ? (
                  <AlertCircle className="h-4 w-4 text-[#ffd700] drop-shadow-[0_0_3px_rgba(255,215,0,0.8)]" />
                ) : (
                  <HelpCircle className="h-4 w-4 text-[#69ccf0] drop-shadow-[0_0_3px_rgba(105,204,240,0.8)]" />
                )}
              </div>
            )}

            {/* Death Marker */}
            {isDeathLoc && (
              <div className="absolute -bottom-1 -left-1 z-10">
                <Skull className="h-4 w-4 text-[#ff6b6b] drop-shadow-[0_0_3px_rgba(255,107,107,0.8)]" />
              </div>
            )}

            {/* Location Symbol or Icon could go here */}
            {isCurrent && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 animate-ping rounded-full bg-[#ffd700]"></div>
              </div>
            )}
          </Link>
        )
      })}

      {locations.length === 0 && (
        <div className="col-span-full flex h-full items-center justify-center text-[#8b7355] italic">
          Mapa se prozkoumává...
        </div>
      )}
    </GameGrid>
  )
}
