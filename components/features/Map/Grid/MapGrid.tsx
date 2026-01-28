import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { GameGrid } from '@/components/ui/game-grid'

import type { Location } from '../Shared/types'

type MapGridProps = {
  locations: Location[]
  currentLocationId: string
  selectedLocationId: string | null
  _discoveredLocations: string[]
  _questMarkers: unknown[]
  _deathLocation?: { x: number; y: number } | null
  onSelectLocation: (location: Location) => void
}

export function MapGrid({
  locations,
  currentLocationId,
  selectedLocationId,
  onSelectLocation,
}: MapGridProps) {
  return (
    <GameGrid columns={{ default: 10, md: 12 }} containerClassName="bg-[#0c0c0c]" className="p-4">
      {locations.map((loc) => (
        <Button
          key={loc.id}
          variant="ghost"
          onClick={() => onSelectLocation(loc)}
          className={cn(
            'group relative flex aspect-square h-auto items-center justify-center rounded-lg border-2 p-0 transition-all duration-300',
            loc.id === currentLocationId
              ? 'border-[#ffd700] bg-[#ffd700]/10 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
              : loc.id === selectedLocationId
                ? 'border-[#d4a574] bg-[#d4a574]/10'
                : 'border-[#8b6f47]/30 bg-black/40 hover:border-[#d4a574]/60'
          )}
        >
          {/* Location Symbol or Icon could go here */}
          {loc.id === currentLocationId && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 animate-ping rounded-full bg-[#ffd700]"></div>
            </div>
          )}
        </Button>
      ))}

      {locations.length === 0 && (
        <div className="col-span-full flex h-full items-center justify-center text-[#8b7355] italic">
          Mapa se prozkoumává...
        </div>
      )}
    </GameGrid>
  )
}
