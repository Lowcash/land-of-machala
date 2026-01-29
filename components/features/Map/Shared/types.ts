import type { LocationType, Location as PrismaLocation } from '@prisma/client'

export type { LocationType }

export type Location = Omit<
  PrismaLocation,
  'createdAt' | 'serverId' | 'isSafeZone' | 'discoveryRadius' | 'questGiverId' | 'questTurnInId'
>

export interface MapFilters {
  showTowns: boolean
  showDungeons: boolean
  showWilderness: boolean
  showLandmarks: boolean
}

export interface QuestMarker {
  locationId: string
  type: 'giver' | 'turnin'
  questId: string
}
