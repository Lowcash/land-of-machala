'use server'

import { db } from '../db'
import { cache } from 'react'
import { random } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlayer, hasPlayerLoot, isPlayerInCombat } from './player'
import { getInventory } from './inventory'
import { enemyEmitter } from './_game'
import { getPlace } from './place'

import { ERROR_CAUSE } from '@/const'

export const checkForEnemy = protectedAction.mutation(async () => {
  const player = await getPlayer()

  const hasEnemyAppear = Math.round(Math.random()) === 1

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

export const getInfo = cache(
  protectedAction.query(async () => {
    const player = await getPlayer()

    if (await isPlayerInCombat()) return { enemy: player.enemy_instance }
    if (await hasPlayerLoot()) return { loot: player.loot }

    const place = await getPlace({ posX: player.pos_x, posY: player.pos_y })
    if (!!place) return { place, defeated: player.defeated }

    return {}
  }),
)

export const attack = protectedAction.mutation(async () => {
  if (!(await isPlayerInCombat())) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  const player = await getPlayer()

  // const damageFromPlayer = random(player.damage_min, player.damage_max)
  const damageFromPlayer = 1000
  const damageFromEnemy = random(player.enemy_instance!.enemy.damage_from ?? 0, player.enemy_instance!.enemy.damage_to)

  const actualPlayerHP = (player.hp_actual ?? 0) - damageFromEnemy
  const actualEnemyHP = player.enemy_instance!.hp_actual - damageFromPlayer

  await db.user.update({
    data: {
      hp_actual: actualPlayerHP,
    },
    where: { id: player.id },
  })

  const playerDefeated = actualPlayerHP <= 0
  const enemyDefeated = actualEnemyHP <= 0

  if (!playerDefeated && !enemyDefeated) {
    await db.enemyInstance.update({
      where: { id: player.enemy_instance!.id },
      data: {
        hp_actual: actualEnemyHP,
      },
    })

    return
  }

  const enemy = player.enemy_instance!.enemy

  const possibleEnemyXpGain = random(enemy.xp_from ?? 0, enemy.xp_to ?? 0)
  const possibleEnemyMoneyGain = random(enemy.money_from ?? 0, enemy.money_to ?? 0)

  await db.enemyInstance.delete({ where: { id: player.enemy_instance!.id } })

  if (playerDefeated) {
    const inventory = await getInventory()

    await db.$transaction(async (db) => {
      await Promise.all([
        db.armorInInventory.deleteMany({
          where: { inventory_id: inventory.id },
        }),
        db.weaponInInventory.deleteMany({
          where: { inventory_id: inventory.id },
        }),
        db.potionInInventory.deleteMany({
          where: { inventory_id: inventory.id },
        }),
      ])

      await db.user.update({
        where: { id: player.id },
        data: { defeated: true, money: 0, pos_x: 0, pos_y: 0 },
      })
    })

    return
  }

  if (enemyDefeated) {
    enemyEmitter.emit('defeated', enemy)

    const weapon = await db.weapon.findFirst({
      skip: random(await db.weapon.count()),
      take: 1,
    })
    const armor = await db.armor.findFirst({
      skip: random(await db.armor.count()),
      take: 1,
    })

    const loot = await db.loot.create({
      data: {
        weapons_loot: {
          create: weapon ? [{ weapon: { connect: weapon } }] : undefined,
        },
        armors_loot: {
          create: armor ? [{ armor: { connect: armor } }] : undefined,
        },
        money: possibleEnemyMoneyGain,
      },
    })

    const xpActual = (player.xp_actual ?? 0) + possibleEnemyXpGain
    const xpMax = player.xp_max ?? 0
    const hasLevelUp = xpActual > xpMax

    await db.user.update({
      where: { id: player.id },
      data: {
        xp_actual: hasLevelUp ? xpActual - xpMax : xpActual,
        level: hasLevelUp ? player.level + 1 : player.level,
        loot_id: loot.id,
      },
    })

    return
  }
})

export const runAway = protectedAction.mutation(async () => {
  if (!(await isPlayerInCombat())) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  await db.enemyInstance.delete({ where: { id: (await getPlayer()).enemy_instance!.id } })
})

export const loot = protectedAction.mutation(async () => {
  const player = await getPlayer()

  if (!player.loot) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  const inventory = await getInventory()

  await db.$transaction(async (db) => {
    for (const l of player.loot!.weapons_loot) {
      await db.weaponInInventory.create({
        data: {
          weapon_id: l.weapon_id,
          inventory_id: inventory.id,
        },
      })
    }
    for (const l of player.loot!.armors_loot) {
      await db.armorInInventory.create({
        data: {
          armor_id: l.armor_id,
          inventory_id: inventory.id,
        },
      })
    }

    await db.weaponInLoot.deleteMany({
      where: { loot_id: player.loot!.id },
    })
    await db.armorInLoot.deleteMany({
      where: { loot_id: player.loot!.id },
    })
    await db.loot.delete({
      where: { id: player.loot!.id },
    })

    await collectReward(db, { money: player.loot?.money })

    await db.user.update({
      where: { id: player.id },
      data: { loot_id: null },
    })
  })
})

export async function collectReward(db: Prisma.TransactionClient, reward: { money?: number | null }) {
  const player = await getPlayer()

  const moneyActual = (player.money ?? 0) + (reward.money ?? 0)

  await db.user.update({
    where: { id: player.id },
    data: { money: moneyActual },
  })
}
