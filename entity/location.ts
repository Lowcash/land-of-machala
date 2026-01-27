import type { LocationType } from '@prisma/client'

import { prisma } from '@/lib/db'

/**
 * Location Entity Layer
 * Handles map locations and discovery
 */

export async function getAllLocations() {
  return await prisma.location.findMany({
    orderBy: [{ type: 'asc' }, { level: 'asc' }],
  })
}

export async function getLocation(id: string) {
  return await prisma.location.findUnique({
    where: { id },
  })
}

export async function getLocationByName(name: string) {
  return await prisma.location.findUnique({
    where: { name },
  })
}

export async function getLocationsByType(type: LocationType) {
  return await prisma.location.findMany({
    where: { type },
    orderBy: [{ level: 'asc' }],
  })
}

export async function getLocationsByLevel(minLevel: number, maxLevel: number) {
  return await prisma.location.findMany({
    where: {
      level: {
        gte: minLevel,
        lte: maxLevel,
      },
    },
    orderBy: [{ level: 'asc' }],
  })
}

/**
 * Calculate distance between two locations
 */
export function calculateDistance(
  from: { positionX: number; positionY: number },
  to: { positionX: number; positionY: number }
): number {
  const dx = to.positionX - from.positionX
  const dy = to.positionY - from.positionY
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Check if a location is accessible based on character level
 */
export function isLocationAccessible(
  location: { level: number },
  characterLevel: number,
  levelBuffer = 3
): boolean {
  return characterLevel >= location.level - levelBuffer
}

/**
 * Get nearby locations within a certain radius
 */
export async function getNearbyLocations(centerX: number, centerY: number, radius: number) {
  const allLocations = await prisma.location.findMany()

  return allLocations.filter((location) => {
    const distance = calculateDistance(
      { positionX: centerX, positionY: centerY },
      { positionX: location.positionX, positionY: location.positionY }
    )
    return distance <= radius
  })
}

/**
 * Get recommended locations for character level
 */
export async function getRecommendedLocations(characterLevel: number) {
  const minLevel = Math.max(1, characterLevel - 2)
  const maxLevel = characterLevel + 3

  return await prisma.location.findMany({
    where: {
      level: {
        gte: minLevel,
        lte: maxLevel,
      },
    },
    orderBy: [{ level: 'asc' }],
  })
}
