'use client'

import { useEffect, useState } from 'react'
import { LocationDetails } from './LocationDetails'
import { MapCanvas } from './MapCanvas'
import type { Location } from './types'

const PLAYER_POSITION = { x: 100, y: 100 } // Starting Town position

interface MapClientProps {
  locations: Location[]
}

export function MapClient({ locations }: MapClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (_event: PopStateEvent) => {
      const params = new URLSearchParams(window.location.search)
      const locationId = params.get('locationId')

      if (locationId) {
        const location = locations.find((l) => l.id === locationId)
        if (location) {
          setSelectedLocation(location)
        }
      } else {
        setSelectedLocation(null)
      }
    }

    window.addEventListener('popstate', handlePopState)

    // Check initial URL
    const params = new URLSearchParams(window.location.search)
    const locationId = params.get('locationId')
    if (locationId) {
      const location = locations.find((l) => l.id === locationId)
      if (location) {
        setSelectedLocation(location)
      }
    }

    return () => window.removeEventListener('popstate', handlePopState)
  }, [locations])

  const handleSelectLocation = (location: Location | null) => {
    if (location) {
      const url = new URL(window.location.href)
      url.searchParams.set('locationId', location.id)
      window.history.pushState({ locationId: location.id }, '', url)
      setSelectedLocation(location)
    } else {
      const url = new URL(window.location.href)
      url.searchParams.delete('locationId')
      window.history.pushState({}, '', url)
      setSelectedLocation(null)
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden md:flex-row">
      {/* Map Canvas */}
      <div
        className={`${
          selectedLocation ? 'hidden md:flex' : 'flex-1'
        } relative min-h-[300px] flex-1 overflow-hidden bg-gradient-to-br from-[#1a1510] via-[#2a2318] to-[#1a1510] md:min-h-0`}
      >
        <MapCanvas
          locations={locations}
          playerPosition={PLAYER_POSITION}
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
        />
      </div>

      {/* Mobile Details */}
      {selectedLocation && (
        <div className="w-full overflow-y-auto border-l border-[#8b6f47] bg-black/90 p-4 backdrop-blur-md md:hidden">
          <LocationDetails location={selectedLocation} onClose={() => handleSelectLocation(null)} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="scrollbar-custom hidden w-80 overflow-y-auto border-l border-[#8b6f47] bg-black/90 p-4 backdrop-blur-md md:block">
        {selectedLocation ? (
          <LocationDetails location={selectedLocation} onClose={() => handleSelectLocation(null)} />
        ) : (
          <div className="mb-6 flex min-h-[120px] items-center justify-center border-b border-[#8b6f47] pb-6">
            <div className="text-center">
              <div className="mb-2 text-4xl">🗺️</div>
              <h3
                className="mb-2 text-lg text-[#d4a574]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                Vyber místo
              </h3>
              <p className="text-sm leading-relaxed text-[#8b7355]">
                Klikni na lokaci na mapě pro zobrazení detailů.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
