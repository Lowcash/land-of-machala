import { prisma } from '@/lib/db'
import { Suspense } from 'react'
import { MapClient } from './MapClient'

interface Location {
  id: string
  name: string
  description: string
  type: string
  level: number
  x: number
  y: number
  image: string
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}

async function getLocations() {
  const locations = await prisma.location.findMany({
    orderBy: [{ level: 'asc' }, { name: 'asc' }],
  })

  return locations
}

export async function MapPanel() {
  let locations = await getLocations()

  if (locations.length === 0) {
    locations = [
      {
        id: 'dummy-loc-1',
        name: 'Město Machala',
        description: 'Hlavní město království. Bezpečné útočiště pro všechny dobrodruhy.',
        type: 'TOWN',
        level: 1,
        x: 0,
        y: 0,
        image: '/assets/locations/city.jpg', // Assuming assets exist or path is handled
      },
      {
        id: 'dummy-loc-2',
        name: 'Temný Les',
        description: 'Les plný nebezpečných stvůr a tajemství.',
        type: 'FOREST',
        level: 3,
        x: 1,
        y: 0,
        image: '/assets/locations/forest.jpg',
      },
      {
        id: 'dummy-loc-3',
        name: 'Staré Ruiny',
        description: 'Rozpadlé zdi kdysi mocné pevnosti.',
        type: 'DUNGEON',
        level: 5,
        x: 2,
        y: 1,
        image: '/assets/locations/ruins.jpg',
      },
    ] as Location[]
  }

  const serializedLocations = locations.map((loc: Location) => ({
    ...loc,
    createdAt: loc.createdAt?.toISOString ? loc.createdAt.toISOString() : loc.createdAt || null,
    updatedAt: loc.updatedAt?.toISOString ? loc.updatedAt.toISOString() : loc.updatedAt || null,
  }))

  return (
    <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
      <MapClient locations={serializedLocations} />
    </Suspense>
  )
}
