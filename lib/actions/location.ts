'use server'

import { prisma } from '@/lib/db'
import { getCachedLocationAt, getCachedLocations } from '@/lib/loaders/static-loader'

import type { QuestMarker } from '@/components/features/Map/Shared/types'

export async function getLocationsByServer(serverId: string = 'default') {
  try {
    return await getCachedLocations(serverId)
  } catch (error) {
    console.error('Failed to get locations:', error)
    return []
  }
}

export async function getSafeZoneLocations(serverId: string = 'default') {
  try {
    const locations = await getCachedLocations(serverId)
    return locations.filter((loc) => loc.isSafeZone)
  } catch (error) {
    console.error('Failed to get safe zones:', error)
    return []
  }
}

export async function getLocationAtCoordinates(serverId: string, x: number, y: number) {
  try {
    return await getCachedLocationAt(serverId, x, y)
  } catch (error) {
    console.error('Failed to get location at coordinates:', error)
    return null
  }
}

export async function getQuestMarkersForCharacter(characterId: string): Promise<QuestMarker[]> {
  try {
    const markers: QuestMarker[] = []

    // 1. Get Available Quests (Givers)
    // Find locations that have a questGiverId (quest start)
    // And exclude quests the character has already started/completed
    const locationsWithQuests = await prisma.location.findMany({
      where: {
        questGiverId: { not: null },
      },
      select: {
        id: true,
        questGiverId: true,
      },
    })

    const characterQuests = await prisma.characterQuest.findMany({
      where: { characterId },
      select: { questId: true },
    })
    const startedQuestIds = new Set(characterQuests.map((cq) => cq.questId))

    locationsWithQuests.forEach((loc) => {
      if (loc.questGiverId && !startedQuestIds.has(loc.questGiverId)) {
        markers.push({
          locationId: loc.id,
          type: 'giver',
          questId: loc.questGiverId,
        })
      }
    })

    // 2. Get Active Quest Objectives (Turn-ins / Area targets)
    // Find active quests and match their target location to map locations
    const activeQuests = await prisma.characterQuest.findMany({
      where: {
        characterId,
        status: 'ACTIVE',
      },
      include: {
        quest: {
          select: {
            id: true,
            location: true, // Assuming this is the location name
          },
        },
      },
    })

    // Get all locations to match names
    const contentLocations = await getCachedLocations('default')
    const locationNameMap = new Map(contentLocations.map((l) => [l.name, l.id]))

    activeQuests.forEach((cq) => {
      if (cq.quest.location) {
        const locationId = locationNameMap.get(cq.quest.location)
        if (locationId) {
          markers.push({
            locationId,
            type: 'turnin',
            questId: cq.quest.id,
          })
        }
      }
    })

    return markers
  } catch (error) {
    console.error('Failed to get quest markers:', error)
    return []
  }
}
