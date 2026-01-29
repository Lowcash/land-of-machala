import Link from 'next/link'

import { cn } from '@/lib/utils'

import { GameGrid } from '@/components/ui/game-grid'

import type { Location } from '../Shared/types'

interface MapGridProps {
  locations: Location[]
  currentLocationId: string
  selectedLocationId: string | null
}

export function MapGrid({ locations, currentLocationId, selectedLocationId }: MapGridProps) {
  return (
    <GameGrid columns={{ default: 10, md: 12 }} containerClassName="bg-[#0c0c0c]" className="p-4">
      {locations.map((loc) => {
        const isCurrent = loc.id === currentLocationId
        const isSelected = loc.id === selectedLocationId

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
                  : 'border-[#8b6f47]/30 bg-black/40 hover:border-[#d4a574]/60'
            )}
          >
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
