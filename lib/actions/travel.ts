'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { travelToLocationSchema } from '@/lib/schemas/travel'

import { logActivity } from './activity-log'
import { discoverNearbyLocations } from './discovery'
import { characterProcedure } from './procedures'

export const travelToLocation = characterProcedure
  .createServerAction()
  .input(travelToLocationSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { locationId } = input

    if (character.inCombat) {
      throw new Error('Nemůžeš cestovat během souboje!')
    }

    const location = await prisma.location.findUnique({
      where: { id: locationId },
    })

    if (!location) {
      throw new Error('Lokace nenalezena')
    }

    if (location.level > character.level) {
      throw new Error(`Lokace vyžaduje úroveň ${location.level}`)
    }

    // Calculate distance for activity log
    const dx = character.locationX - location.positionX
    const dy = character.locationY - location.positionY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Update position
    await prisma.character.update({
      where: { id: character.id },
      data: {
        locationX: location.positionX,
        locationY: location.positionY,
        currentView: 'town',
      },
    })

    await logActivity(character.id, 'travel', `Cestoval jsi do: ${location.name}`, {
      locationId,
      distance,
    })

    await discoverNearbyLocations(character.id)

    // Combat check
    if (!location.isSafeZone && Math.random() < 0.6) {
      await import('./combat-state')
    }

    revalidatePath('/game')
    return { success: true }
  })
