'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'

import { logActivity } from './activity-log'
import { characterProcedure } from './procedures'

export const discoverNearbyLocations = characterProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { character } = ctx

    const serverLocations = await prisma.location.findMany({
      where: { serverId: character.serverId },
      select: {
        id: true,
        name: true,
        positionX: true,
        positionY: true,
        discoveryRadius: true,
      },
    })

    const discovered = Array.isArray(character.discoveredLocations)
      ? (character.discoveredLocations as string[])
      : []

    let newDiscoveries = false

    for (const loc of serverLocations) {
      if (discovered.includes(loc.id)) continue

      const dx = character.locationX - loc.positionX
      const dy = character.locationY - loc.positionY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance <= (loc.discoveryRadius || 5)) {
        discovered.push(loc.id)
        newDiscoveries = true

        await logActivity(character.id, 'discovery', `Objevil jsi nové místo: ${loc.name}`, {
          locationId: loc.id,
        })
      }
    }

    if (newDiscoveries) {
      await prisma.character.update({
        where: { id: character.id },
        data: { discoveredLocations: discovered },
      })
      revalidatePath('/game')
    }

    return { success: true, newDiscoveries }
  })
