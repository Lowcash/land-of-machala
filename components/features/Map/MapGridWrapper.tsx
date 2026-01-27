'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { MapGrid } from './Grid/MapGrid'
import type { Location } from './Shared/types'

interface MapGridWrapperProps {
  locations: Location[]
  currentLocationId: string
  selectedLocationId: string | null
  discoveredLocations: string[]
  questMarkers: unknown[]
  deathLocation?: { x: number; y: number } | null
}

export function MapGridWrapper({
  locations,
  currentLocationId,
  selectedLocationId,
  discoveredLocations,
  questMarkers,
  deathLocation,
}: MapGridWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelectLocation = (location: Location | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (location) {
      params.set('locationId', location.id)
    } else {
      params.delete('locationId')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <MapGrid
      locations={locations}
      currentLocationId={currentLocationId}
      selectedLocationId={selectedLocationId}
      _discoveredLocations={discoveredLocations}
      _questMarkers={questMarkers}
      _deathLocation={deathLocation}
      onSelectLocation={handleSelectLocation}
    />
  )
}
