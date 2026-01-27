import { Map as MapIcon } from 'lucide-react'

import { SplitLayout } from '@/components/layout'

import { LocationDetailsWrapper } from './LocationDetailsWrapper'
import { MapGridWrapper } from './MapGridWrapper'
import type { Location } from './Shared/types'

interface MapDashboardProps {
  locations: Location[]
  discoveredLocations: string[]
  questMarkers: unknown[]
  deathLocation?: { x: number; y: number } | null
  currentLocationId?: string
  searchParams: { locationId?: string }
}

export function MapDashboard({
  locations,
  discoveredLocations,
  questMarkers,
  deathLocation,
  currentLocationId = 'town_center',
  searchParams,
}: MapDashboardProps) {
  const selectedLocationId = searchParams?.locationId || null
  const selectedLocation = locations.find((l) => l.id === selectedLocationId) || null

  // Ensure current location is valid object from list
  const currentLocation = locations.find((l) => l.id === currentLocationId) || locations[0]

  return (
    <SplitLayout
      asideWidth="lg"
      hideMobileAside={!selectedLocationId}
      main={
        <div className="flex h-full flex-col">
          {/* Info Bar */}
          <div className="border-game-copper/30 flex shrink-0 items-center justify-between border-b bg-black/40 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-game-gold text-xs font-bold tracking-wider uppercase">
                Lokace: {locations.length}
              </span>
              <span className="text-game-copper-muted">|</span>
              <span className="text-game-gold text-xs font-bold tracking-wider uppercase">
                Prozkoumáno: {Math.floor(locations.length * 0.1)}%
              </span>
            </div>
            <div className="text-game-gold font-mono text-xs">
              {currentLocation?.positionX}, {currentLocation?.positionY}
            </div>
          </div>

          {/* Map Grid Container */}
          <MapGridWrapper
            locations={locations}
            currentLocationId={currentLocationId}
            selectedLocationId={selectedLocationId}
            discoveredLocations={discoveredLocations}
            questMarkers={questMarkers}
            deathLocation={deathLocation}
          />
        </div>
      }
      aside={
        selectedLocation ? (
          <LocationDetailsWrapper location={selectedLocation} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <MapIcon className="text-game-copper-muted mb-4 h-12 w-12 opacity-20" />
            <p className="text-game-copper-muted italic">
              Vyber lokaci na mapě pro zobrazení detailů.
            </p>
          </div>
        )
      }
    />
  )
}
