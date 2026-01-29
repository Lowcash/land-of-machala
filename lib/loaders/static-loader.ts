import { unstable_cache } from 'next/cache'

import { prisma } from '@/lib/db'

/**
 * Cached loader for Locations
 * Revalidates every hour or on demand (via tag 'locations')
 */
export const getCachedLocations = unstable_cache(
  async (serverId: string) => {
    return await prisma.location.findMany({
      where: { serverId },
      orderBy: [{ level: 'asc' }, { name: 'asc' }],
    })
  },
  ['locations'],
  { tags: ['locations'], revalidate: 3600 }
)

export const getCachedLocationAt = unstable_cache(
  async (serverId: string, x: number, y: number) => {
    return await prisma.location.findFirst({
      where: { serverId, positionX: x, positionY: y },
    })
  },
  ['location-at-coords'],
  { tags: ['locations'], revalidate: 3600 }
)

/**
 * Cached loader for Items
 * Revalidates every hour or on demand (via tag 'items')
 */
export const getCachedItem = unstable_cache(
  async (itemId: string) => {
    return await prisma.item.findUnique({
      where: { id: itemId },
    })
  },
  ['item-by-id'],
  { tags: ['items'], revalidate: 3600 }
)

export const getCachedItemsByType = unstable_cache(
  async (_type: string) => {
    // Note: Enum matching might need casting if type is passed as string from URL
    // For now assuming we pass valid ItemType string if needed, or handle in caller
    // But commonly used for "Shop" listing all items?
    // Usually shops have specific items.
    return []
  },
  ['items-by-type'],
  { tags: ['items'], revalidate: 3600 }
)
