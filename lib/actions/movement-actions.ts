'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { moveCharacterSchema } from '@/lib/schemas/movement'

import { characterProcedure } from './procedures'

const DIRECTION_DELTAS = {
  north: { x: 0, y: 1 },
  south: { x: 0, y: -1 },
  east: { x: 1, y: 0 },
  west: { x: -1, y: 0 },
} as const

export const moveCharacter = characterProcedure
  .createServerAction()
  .input(moveCharacterSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { direction } = input

    const delta = DIRECTION_DELTAS[direction]
    const newX = character.locationX + delta.x
    const newY = character.locationY + delta.y

    await prisma.character.update({
      where: { id: character.id },
      data: {
        locationX: newX,
        locationY: newY,
      },
    })

    // Random combat encounter (40% chance when outside town)
    const encounterChance = Math.random()
    const hasEncounter = encounterChance < 0.4

    if (hasEncounter) {
      const enemy =
        (await prisma.enemy.findFirst({
          where: {
            level: {
              lte: Math.max(1, character.level + 2),
              gte: Math.max(1, character.level - 2),
            },
          },
        })) || (await prisma.enemy.findFirst())

      if (enemy) {
        await prisma.character.update({
          where: { id: character.id },
          data: {
            inCombat: true,
            combatEnemyId: enemy.id,
            combatTurn: 'player',
            combatPlayerHp: character.hp,
            combatEnemyHp: enemy.maxHp,
            currentView: 'combat',
          },
        })

        revalidatePath('/game')
        return { success: true, newX, newY, hasEncounter: true }
      }
    }

    revalidatePath('/game')

    return {
      success: true,
      newX,
      newY,
      hasEncounter: false,
    }
  })
