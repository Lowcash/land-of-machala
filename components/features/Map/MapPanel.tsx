import { prisma } from '@/lib/db'
import { Suspense } from 'react'
import { MapClient } from './MapClient'

async function getLocations() {
  const locations = await prisma.location.findMany({
    orderBy: [{ level: 'asc' }, { name: 'asc' }],
  })

  return locations
}

export async function MapPanel() {
  const locations = await getLocations()

  return (
    <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
      <MapClient locations={locations} />
    </Suspense>
  )
}
