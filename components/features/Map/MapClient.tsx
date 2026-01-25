'use client'

import { SplitLayout } from '@/components/layout'
import { Map as MapIcon } from 'lucide-react'
import { useState } from 'react'
import { LocationDetails } from './Detail/LocationDetails'
import { MapGrid } from './Grid/MapGrid'
import type { Location } from './Shared/types'

interface MapClientProps {
  locations: Location[]
  discoveredLocations: string[]
  questMarkers: unknown[]
  deathLocation?: { x: number; y: number } | null
  currentLocationId?: string
}

export function MapClient({
  locations,
  discoveredLocations,
  questMarkers,
  deathLocation,
  currentLocationId = 'town_center',
}: MapClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  const mapLocations = locations
  const currentLocation = mapLocations.find((l) => l.id === currentLocationId) || mapLocations[0]

  return (
    <SplitLayout
      asideWidth="lg"
      hideMobileAside={!selectedLocation}
      main={
        <div className="flex h-full flex-col">
          {/* Info Bar */}
          <div className="border-game-copper/30 flex shrink-0 items-center justify-between border-b bg-black/40 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-game-gold text-xs font-bold tracking-wider uppercase">
                Lokace: {mapLocations.length}
              </span>
              <span className="text-game-copper-muted">|</span>
              <span className="text-game-gold text-xs font-bold tracking-wider uppercase">
                Prozkoumáno: {Math.floor(mapLocations.length * 0.1)}%
              </span>
            </div>
            <div className="text-game-gold font-mono text-xs">
              {currentLocation?.positionX}, {currentLocation?.positionY}
            </div>
          </div>

          {/* Map Grid Container */}
          <MapGrid
            locations={mapLocations}
            currentLocationId={currentLocationId}
            selectedLocationId={selectedLocation?.id || null}
            _discoveredLocations={discoveredLocations}
            _questMarkers={questMarkers}
            _deathLocation={deathLocation}
            onSelectLocation={setSelectedLocation}
          />
        </div>
      }
      aside={
        selectedLocation ? (
          <LocationDetails
            location={selectedLocation}
            onCloseAction={() => setSelectedLocation(null)}
          />
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
