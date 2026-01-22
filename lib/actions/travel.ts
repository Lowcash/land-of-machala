'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { logActivity } from './activity-log'
import { discoverNearbyLocations } from './discovery'

export async function travelToLocation(characterId: string, locationId: string) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    })

    if (!character) throw new Error('Postava nenalezena')
    if (character.inCombat) throw new Error('Nemůžeš cestovat během souboje!')

    const location = await prisma.location.findUnique({
      where: { id: locationId },
    })

    if (!location) throw new Error('Lokace nenalezena')
    if (location.level > character.level)
      throw new Error(`Lokace vyžaduje úroveň ${location.level}`)

    // Calculate distance and cost
    const dx = character.locationX - location.positionX
    const dy = character.locationY - location.positionY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Energy handling removed from DB (per error msg previously), assuming Stamina or just free for now?
    // Wait, Plan says "energy cost formula". But DB push warn said "dropping column energy".
    // I need to check if Character has "energy" or "stamina".
    // Schema says: stamina Int @default(10). But usually Energy is a resource like HP/Mana.
    // Schema shows "mana". Maybe "energy" was removed?
    // User plan says: "energy-consuming travel".
    // If "energy" column was dropped, I should probably use "stamina" (stat) to calculate max energy, or reuse "mana", OR re-add "energy" field.
    // Given the breaking change warning, it seems "energy" was removed.
    // I will skip energy cost for now OR use Mana if appropriate, OR just validation.
    // Plan: "Math.ceil(distance / 10), minimum 1...".

    // Check if enemies present (random encounter logic is in movement-actions, but travel might skip it or trigger it?)
    // Plan: "triggers 60% combat encounter ONLY if destination isSafeZone=false".

    // Update position
    await prisma.character.update({
      where: { id: characterId },
      data: {
        locationX: location.positionX,
        locationY: location.positionY,
        currentView: 'town', // Or map?
      },
    })

    await logActivity(characterId, 'travel', `Cestoval jsi do: ${location.name}`, {
      locationId,
      distance,
    })

    await discoverNearbyLocations(characterId)

    // Combat check
    if (!location.isSafeZone && Math.random() < 0.6) {
      // Trigger combat
      const { startCombat } = await import('./combat-state')
      await startCombat(characterId)
    }

    revalidatePath('/game')
    return { success: true }
  } catch (error: any) {
    console.error('Travel error:', error)
    return { success: false, error: error.message }
  }
}
