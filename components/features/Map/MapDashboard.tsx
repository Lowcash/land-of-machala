import { Eye, Map as MapIcon } from 'lucide-react'

import { SplitLayout } from '@/components/layout'
import { StatDisplay } from '@/components/ui/display'
import { InfoBar } from '@/components/ui/info-bar'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, P } from '@/components/ui/typography'

import { LocationDetails } from './Detail/LocationDetails'
import { MapGrid } from './Grid/MapGrid'
import type { Location, QuestMarker } from './Shared/types'

interface MapDashboardProps {
  locations: Location[]
  discoveredLocations: string[]
  questMarkers: QuestMarker[]
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
        <VStack gap="none" fullWidth fullHeight>
          {/* Info Bar */}
          <InfoBar>
            <HStack align="center" gap="md">
              <StatDisplay
                icon={MapIcon}
                label="Lokace"
                value={locations.length}
                color="gold"
                size="sm"
              />
              <StatDisplay
                icon={Eye}
                label="Prozkoumáno"
                value={`${Math.floor(locations.length * 0.1)}%`}
                color="gold"
                size="sm"
              />
            </HStack>
            <Caption font="mono" color="gold">
              {currentLocation?.positionX}, {currentLocation?.positionY}
            </Caption>
          </InfoBar>

          {/* Map Grid Container */}
          <VStack flex="1" minH="0" fullWidth>
            <MapGrid
              locations={locations}
              discoveredLocations={discoveredLocations}
              questMarkers={questMarkers}
              deathLocation={deathLocation}
              currentLocationId={currentLocationId}
              selectedLocationId={selectedLocationId}
            />
          </VStack>
        </VStack>
      }
      aside={
        selectedLocation ? (
          <LocationDetails location={selectedLocation} />
        ) : (
          <VStack p="xl" align="center" justify="center" fullHeight fullWidth>
            <VStack align="center" justify="center" gap="md">
              <MapIcon className="text-game-copper-muted h-12 w-12 opacity-20" />
              <P color="copper" italic align="center">
                Vyber lokaci na mapě pro zobrazení detailů.
              </P>
            </VStack>
          </VStack>
        )
      }
    />
  )
}
