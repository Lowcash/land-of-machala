import type { LocationType } from '@prisma/client'

import { getLocationsByServer, getQuestMarkersForCharacter } from '@/lib/actions/location'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { DEMO_LOCATIONS } from '@/lib/game/map'

import type { Location, QuestMarker } from '@/components/features/Map/Shared/types'

export async function getMapPageData(): Promise<{
  characterId: string
  serializedLocations: Location[]
  discoveredLocations: string[]
  questMarkers: QuestMarker[]
  deathLocation: { x: number; y: number; expiresAt: string } | null
} | null> {
  const session = await auth()
  if (!session?.user?.id) return null

  const userId = session.user.id
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

  const filteredDemoLocations = DEMO_LOCATIONS.filter((l) => !knownIds.has(l.id as string))

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
    ...(filteredDemoLocations as Location[]),
  ]

  return {
    characterId: character.id,
    serializedLocations,
    discoveredLocations: [
      ...discoveredLocations,
      ...filteredDemoLocations.map((d) => d.id).filter((id): id is string => !!id),
    ],
    questMarkers,
    deathLocation: character.deathLocation as unknown as {
      x: number
      y: number
      expiresAt: string
    } | null,
  }
}
