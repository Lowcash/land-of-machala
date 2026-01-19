'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { logActivity } from './activity-log'

export async function discoverNearbyLocations(characterId: string) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: { 
        id: true, 
        serverId: true, 
        locationX: true, 
        locationY: true, 
        discoveredLocations: true 
      }
    })

    if (!character) return

    const serverLocations = await prisma.location.findMany({
      where: { serverId: character.serverId },
      select: { id: true, name: true, positionX: true, positionY: true, discoveryRadius: true }
    })

    let discovered = Array.isArray(character.discoveredLocations) 
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
        
        await logActivity(
          characterId,
          'discovery',
          `Objevil jsi nové místo: ${loc.name}`,
          { locationId: loc.id }
        )
      }
    }

    if (newDiscoveries) {
      await prisma.character.update({
        where: { id: characterId },
        data: { discoveredLocations: discovered }
      })
      revalidatePath('/game')
    }

  } catch (error) {
    console.error('Discovery error:', error)
  }
}
