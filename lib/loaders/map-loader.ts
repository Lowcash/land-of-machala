import type { Location } from '@/components/features/Map/Shared/types'
import { getLocationsByServer, getQuestMarkersForCharacter } from '@/lib/actions/location'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import type { LocationType } from '@prisma/client'

export async function getMapPageData(userId: string) {
  const session = await auth()
  if (!session?.user?.id || session.user.id !== userId) return null

  const character = await prisma.character.findFirst({
    where: { userId },
    select: {
      id: true,
      serverId: true,
      discoveredLocations: true,
      deathLocation: true,
    },
  })

  if (!character) return null

  const serverId = character.serverId || 'default'

  const [locations, questMarkers] = await Promise.all([
    getLocationsByServer(serverId),
    getQuestMarkersForCharacter(character.id),
  ])

  // Process discovered locations
  const discoveredLocations = Array.isArray(character.discoveredLocations)
    ? (character.discoveredLocations as string[])
    : []

  // Hardcoded locations for demo/dev purposes
  const knownIds = new Set(locations.map((l) => l.id))

  const demoLocations: Partial<Location>[] = [
    {
      id: 'demo-cave',
      name: 'Gobliní Jeskyně',
      description: 'Temná a vlhká jeskyně plná zlomyslných skřetů.',
      type: 'DUNGEON' as LocationType,
      level: 5,
      positionX: 150,
      positionY: 80,
    },
    {
      id: 'demo-ruins',
      name: 'Staré Ruiny',
      description: 'Pozůstatky starověké civilizace, které prý ukrývají poklad.',
      type: 'LANDMARK' as LocationType,
      level: 10,
      positionX: 200,
      positionY: 150,
    },
    {
      id: 'demo-forest',
      name: 'Temný Hvozd',
      description: 'Les, kam slunce nesvítí a stromy šeptají.',
      type: 'WILDERNESS' as LocationType,
      level: 3,
      positionX: 80,
      positionY: 120,
    },
    {
      id: 'demo-lake',
      name: 'Jezero Snů',
      description: 'Klidné jezero s křišťálovou vodou.',
      type: 'LANDMARK' as LocationType,
      level: 1,
      positionX: 120,
      positionY: 180,
    },
  ].filter((l) => !knownIds.has(l.id as string))

  const serializedLocations: Location[] = [
    ...locations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      description: loc.description,
      type: loc.type as LocationType,
      level: loc.level,
      positionX: loc.positionX,
      positionY: loc.positionY,
    })),
    ...(demoLocations as Location[]),
  ]

  return {
    characterId: character.id,
    serializedLocations,
    discoveredLocations: [
      ...discoveredLocations,
      ...demoLocations.map((d) => d.id).filter((id): id is string => !!id),
    ],
    questMarkers,
    deathLocation: character.deathLocation,
  }
}
