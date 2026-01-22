import { PageTemplate, SplitView } from '@/components/layout'
import { Map, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MapCanvas } from './Canvas/MapCanvas'
import { LocationDetails } from './Detail/LocationDetails'
import type { Location } from './Shared/types'

const PLAYER_POSITION = { x: 100, y: 100 } // Starting Town position

interface MapClientProps {
  locations: Location[]
  discoveredLocations?: string[]
  questMarkers?: any[]
  deathLocation?: any
}

export function MapClient({
  locations,
  discoveredLocations,
  questMarkers,
  deathLocation,
}: MapClientProps) {
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

  // Empty state for sidebar
  const emptyState = (
    <div className="flex h-full items-center justify-center p-4">
      <div className="text-center">
        <Map className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
        <h3 className="mb-2 text-lg text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Vyber místo
        </h3>
        <p className="text-sm leading-relaxed text-[#8b7355]">
          Klikni na lokaci na mapě pro zobrazení detailů.
        </p>
      </div>
    </div>
  )

  return (
    <PageTemplate
      title="Mapa světa"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      icon={<MapPin className="h-6 w-6" />}
      maxWidth="full"
    >
      <SplitView
        main={
          <div className="relative h-full min-h-[500px] w-full bg-linear-to-br from-[#1a1510] via-[#2a2318] to-[#1a1510]">
            <MapCanvas
              locations={locations}
              playerPosition={PLAYER_POSITION}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
              discoveredLocations={discoveredLocations}
              questMarkers={questMarkers}
              deathLocation={deathLocation}
            />
          </div>
        }
        aside={
          selectedLocation ? (
            <LocationDetails
              location={selectedLocation}
              onClose={() => handleSelectLocation(null)}
            />
          ) : (
            emptyState
          )
        }
        asideWidth="md"
      />
    </PageTemplate>
  )
}
