'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { endCombatSchema, initiateCombatSchema } from '@/lib/schemas/combat'

import { logActivity } from './activity-log'
import { characterProcedure } from './procedures'

export const startCombat = characterProcedure
  .createServerAction()
  .input(initiateCombatSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { enemyId } = input

    let targetEnemyId = enemyId
    if (!targetEnemyId) {
      // Simple random logic or fetch from DB
      const enemies = await prisma.enemy.findMany({
        where: {
          level: {
            lte: character.level + 2,
            gte: Math.max(1, character.level - 2),
          },
        },
      })

      if (enemies.length > 0) {
        targetEnemyId = enemies[Math.floor(Math.random() * enemies.length)]!.id
      }
    }

    if (!targetEnemyId) {
      throw new Error('Nepřítel nenalezen')
    }

    // Save pre-combat location
    const preCombatLoc = { x: character.locationX, y: character.locationY }

    await prisma.character.update({
      where: { id: character.id },
      data: {
        inCombat: true,
        combatEnemyId: targetEnemyId,
        currentEnemyId: targetEnemyId,
        preCombatLocation: preCombatLoc,
        combatTurn: 'player',
        combatPlayerHp: character.hp,
      },
    })

    // Update enemy HP
    const enemy = await prisma.enemy.findUnique({ where: { id: targetEnemyId } })

    if (enemy) {
      await prisma.character.update({
        where: { id: character.id },
        data: { combatEnemyHp: enemy.maxHp },
      })

      await logActivity(character.id, 'combat', `Boj začal! Nepřítel: ${enemy.name}`)
    }

    revalidatePath('/game')
    return { success: true }
  })

interface Point {
  x: number
  y: number
}

export const endCombat = characterProcedure
  .createServerAction()
  .input(endCombatSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { result } = input

    if (result === 'victory') {
      await prisma.character.update({
        where: { id: character.id },
        data: {
          inCombat: false,
          combatEnemyId: null,
          currentEnemyId: null,
          combatPlayerHp: null,
          combatEnemyHp: null,
        },
      })
      await logActivity(character.id, 'combat', 'Zvítězil jsi v souboji!')
    } else if (result === 'flee') {
      // Restore position
      if (character.preCombatLocation) {
        const loc = character.preCombatLocation as unknown as Point
        await prisma.character.update({
          where: { id: character.id },
          data: {
            inCombat: false,
            locationX: loc.x,
            locationY: loc.y,
            combatEnemyId: null,
          },
        })
      }
      await logActivity(character.id, 'combat', 'Utekl jsi z boje.')
    } else if (result === 'defeat') {
      // Death penalty
      const deathLoc = {
        x: character.locationX,
        y: character.locationY,
        items: [], // serialized items
        gold: Math.floor(character.gold * 0.5), // Drop 50% gold example
        enemyId: character.combatEnemyId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }

      // Respawn at safe zone
      const safeZone = await prisma.location.findFirst({
        where: { serverId: character.serverId, isSafeZone: true },
      })

      await prisma.character.update({
        where: { id: character.id },
        data: {
          inCombat: false,
          hp: 1,
          gold: character.gold - deathLoc.gold,
          deathLocation: deathLoc,
          locationX: safeZone?.positionX ?? 0,
          locationY: safeZone?.positionY ?? 0,
          combatEnemyId: null,
        },
      })

      await logActivity(character.id, 'death', 'Zemřel jsi! Tvé věci zůstaly na místě smrti.', {
        deathLocation: deathLoc,
      })
    }

    revalidatePath('/game')
    return { success: true }
  })
