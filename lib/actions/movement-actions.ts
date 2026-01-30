'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { moveCharacterSchema } from '@/lib/schemas/movement'

import { logActivity } from './activity-log'
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

    // Random encounters (50% total chance when outside town)
    const roll = Math.random()

    // 30% chance for combat
    if (roll < 0.3) {
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

        await logActivity(character.id, 'death', `Byl jsi napaden nepřítelem: ${enemy.name}!`)
        revalidatePath('/game')
        return { success: true, newX, newY, hasEncounter: true, encounterType: 'combat' }
      }
    }
    // 20% chance for non-combat event (0.3 to 0.5)
    else if (roll < 0.5) {
      const events = [
        {
          type: 'gold',
          message: 'Našel jsi starý měšec s pár mincemi!',
          logMessage: 'Našel jsi starý měšec s mincemi.',
          action: () =>
            prisma.character.update({
              where: { id: character.id },
              data: { gold: { increment: Math.floor(Math.random() * 10) + 5 } },
            }),
        },
        {
          type: 'xp',
          message: 'Objevil jsi krásný výhled na krajinu. Cítíš se inspirován.',
          logMessage: 'Objevil jsi krásný výhled na krajinu.',
          action: () =>
            prisma.character.update({
              where: { id: character.id },
              data: { experience: { increment: 10 } },
            }),
        },
        {
          type: 'mana',
          message: 'U silnice roste trs kouzelných bylin. Cítíš, jak se ti vrací energie.',
          logMessage: 'Našel jsi kouzelné byliny.',
          action: () =>
            prisma.character.update({
              where: { id: character.id },
              data: { mana: { set: Math.min(character.maxMana, character.mana + 15) } },
            }),
        },
      ]

      const event = events[Math.floor(Math.random() * events.length)]
      if (event) {
        await event.action()
        await logActivity(character.id, 'discovery', event.logMessage)
        revalidatePath('/game')
        return {
          success: true,
          newX,
          newY,
          hasEncounter: true,
          encounterType: 'event',
          message: event.message,
        }
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
