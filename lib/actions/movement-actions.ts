'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const DIRECTION_DELTAS = {
  north: { x: 0, y: 1 },
  south: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  west: { x: -1, y: 0 },
} as const

export async function moveCharacter(
  characterId: string,
  direction: 'north' | 'south' | 'east' | 'west'
) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: { locationX: true, locationY: true },
    })

    if (!character) {
      return { success: false, error: 'Character not found' }
    }

    const delta = DIRECTION_DELTAS[direction]
    const newX = character.locationX + delta.x
    const newY = character.locationY + delta.y

    await prisma.character.update({
      where: { id: characterId },
      data: {
        locationX: newX,
        locationY: newY,
      },
    })

    // Random combat encounter (40% chance when outside town)
    const encounterChance = Math.random()
    const hasEncounter = encounterChance < 0.4
    
    if (hasEncounter) {
        // Need to fetch full character to get level
        const fullChar = await prisma.character.findUnique({ where: { id: characterId } })
        
        if (fullChar) {
             const enemy = await prisma.enemy.findFirst({
                 where: { level: { lte: Math.max(1, fullChar.level + 2), gte: Math.max(1, fullChar.level - 2) } },
             }) || await prisma.enemy.findFirst()

             if (enemy) {
                 await prisma.character.update({
                    where: { id: characterId },
                    data: {
                        inCombat: true,
                        combatEnemyId: enemy.id,
                        combatTurn: 'player',
                        combatPlayerHp: fullChar.hp,
                        combatEnemyHp: enemy.maxHp,
                        currentView: 'combat'
                    }
                 })
                 
                 revalidatePath('/game')
                 return { success: true, newX, newY, hasEncounter: true }
             }
        }
    }

    revalidatePath('/game')
    revalidatePath(`/api/character/${characterId}/stats`)

    return {
      success: true,
      newX,
      newY,
      hasEncounter: false,
    }
  } catch (error) {
    console.error('Movement error:', error)
    return { success: false, error: 'Failed to move character' }
  }
}
