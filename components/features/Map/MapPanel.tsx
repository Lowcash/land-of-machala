import { prisma } from '@/lib/db'
import { Map } from 'lucide-react'
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
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0a0806]">
      <div className="border-b border-[#8b6f47] bg-black/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-[#ffd700]" />
          <h1 className="text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            Mapa světa Machala
          </h1>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání...</div>}>
        <MapClient locations={locations} />
      </Suspense>
    </div>
  )
}
