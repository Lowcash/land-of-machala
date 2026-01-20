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

  // Hardcoded locations for demo/dev purposes
  // Avoid duplicates by checking IDs
  const knownIds = new Set(locations.map(l => l.id))
  
  const demoLocations: Location[] = [
    {
      id: "demo-cave",
      name: "Gobliní Jeskyně",
      description: "Temná a vlhká jeskyně plná zlomyslných skřetů.",
      type: "DUNGEON",
      level: 5,
      positionX: 150,
      positionY: 80
    } as any,
    {
      id: "demo-ruins",
      name: "Staré Ruiny",
      description: "Pozůstatky starověké civilizace, které prý ukrývají poklad.",
      type: "LANDMARK",
      level: 10,
      positionX: 200,
      positionY: 150
    } as any,
    {
      id: "demo-forest",
      name: "Temný Hvozd",
      description: "Les, kam slunce nesvítí a stromy šeptají.",
      type: "WILDERNESS",
      level: 3,
      positionX: 80,
      positionY: 120
    } as any,
    {
      id: "demo-lake",
      name: "Jezero Snů",
      description: "Klidné jezero s křišťálovou vodou.",
      type: "LANDMARK",
      level: 1,
      positionX: 120,
      positionY: 180
    } as any
  ].filter(l => !knownIds.has(l.id))

  const serializedLocations: Location[] = [...locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    description: loc.description,
    type: loc.type as any, // Cast to LocationType
    level: loc.level,
    positionX: loc.positionX,
    positionY: loc.positionY
  })), ...demoLocations]
  
  // Check for debug mode from env
  const isDebug = process.env.NEXT_PUBLIC_DEBUG_MAP === 'true'

  return (
    <Suspense fallback={<div className="p-8 text-center text-[#d4a574]">Načítání mapy...</div>}>
      <MapClient 
        locations={serializedLocations} 
        discoveredLocations={[...discoveredLocations, ...demoLocations.map(d => d.id)]}
        questMarkers={questMarkers}
        deathLocation={deathLocation}
        isDebug={isDebug}
      />
    </Suspense>
  )
}
