'use server'

import { prisma } from '@/lib/db'

export async function getLocationsByServer(serverId: string = 'default') {
  try {
    return await prisma.location.findMany({
      where: { serverId },
      orderBy: [{ level: 'asc' }, { name: 'asc' }],
    })
  } catch (error) {
    console.error('Failed to get locations:', error)
    return []
  }
}

export async function getSafeZoneLocations(serverId: string = 'default') {
  try {
    return await prisma.location.findMany({
      where: { serverId, isSafeZone: true },
    })
  } catch (error) {
    console.error('Failed to get safe zones:', error)
    return []
  }
}

export async function getLocationAtCoordinates(serverId: string, x: number, y: number) {
  try {
    return await prisma.location.findFirst({
      where: { serverId, positionX: x, positionY: y },
    })
  } catch (error) {
    console.error('Failed to get location at coordinates:', error)
    return null
  }
}

export async function getQuestMarkersForCharacter(characterId: string) {
  // In a real implementation, this would join with quests and check status
  // For now, we return empty or mock data based on active quests
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        quests: {
          where: { status: { in: ['AVAILABLE', 'ACTIVE'] } },
          include: { quest: true },
        },
      },
    })

    if (!character) return []

    // TODO: Implement actual quest tracking
    // For now, return empty array
    return []
  } catch (error) {
    console.error('Failed to get quest markers:', error)
    return []
  }
}
