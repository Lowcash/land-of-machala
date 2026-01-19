import { getLocationsByServer, getQuestMarkersForCharacter } from '@/lib/actions/location'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Suspense } from 'react'
import { MapClient } from './MapClient'
import { Location } from './types'

async function getCharacterMapData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await prisma.character.findFirst({
    where: { userId: session.user.id },
    select: {
      id: true,
      serverId: true,
      discoveredLocations: true,
      deathLocation: true,
      // Add other needed fields
    }
  })

  return character
}

export async function MapPanel() {
  const character = await getCharacterMapData()
  
  // Default fallback if no character (e.g. creating one)
  const serverId = character?.serverId || 'default'
  
  const [locations, questMarkers] = await Promise.all([
    getLocationsByServer(serverId),
    character ? getQuestMarkersForCharacter(character.id) : []
  ])

  // Process discovered locations
  // Ensure it's an array of strings
  const discoveredLocations = Array.isArray(character?.discoveredLocations) 
    ? character?.discoveredLocations as string[] 
    : []

  // Process death location
  const deathLocation = character?.deathLocation as any // Type assertion for JSON field

  const serializedLocations: Location[] = locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    description: loc.description,
    type: loc.type as any, // Cast to LocationType
    level: loc.level,
    positionX: loc.positionX,
    positionY: loc.positionY
  }))
  
  // Check for debug mode from env
  const isDebug = process.env.NEXT_PUBLIC_DEBUG_MAP === 'true'

  return (
    <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání mapy...</div>}>
      <MapClient 
        locations={serializedLocations} 
        discoveredLocations={discoveredLocations}
        questMarkers={questMarkers}
        deathLocation={deathLocation}
        isDebug={isDebug}
      />
    </Suspense>
  )
}
