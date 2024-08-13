'use server'

import { db } from '../db'
import { cache } from 'react'
import { random } from '@/lib/utils'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlayer, hasPlayerLoot, isPlayerInCombat } from './player'

import { ERROR_CAUSE } from '@/const'

export const checkForEnemy = protectedAction.mutation(async () => {
  const player = await getPlayer()

  // const hasEnemyAppear = Math.round(Math.random()) === 1
  const hasEnemyAppear = false as boolean

  if (!hasEnemyAppear) return

  const enemy = await db.enemy.findFirst({
    skip: random(await db.enemy.count()),
    take: 1,
  })

  if (!enemy) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  const hp = random(enemy.hp_to, enemy.hp_from)

  return await db.user.update({
    where: { id: player.id },
    data: {
      enemy_instance: {
        create: {
          enemy: { connect: enemy },
          hp_actual: hp,
          hp_max: hp,
        },
      },
    },
    include: { enemy_instance: { include: { enemy: true } } },
  })
})

export const getGameInfo = cache(
  protectedAction.query(async () => {
    const player = await getPlayer()

    if (await isPlayerInCombat()) return player.enemy_instance
    if (await hasPlayerLoot()) return player.loot

    return {}
  }),
)
