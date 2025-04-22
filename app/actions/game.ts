'use server'

import i18n from '@/lib/i18n'
import type { Location } from '@/types'
import { db } from '@/lib/db'
import { cache } from 'react'
import { random } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { authActionClient } from '@/lib/safe-action'
import { emitter as enemyEmitter } from '@/lib/events/enemy'

import * as PlayerAction from './player'
import Place from '@/entity/place'
import * as InventoryAction from './inventory'

import { ERROR_CAUSE } from '@/config'

export const infoShow = cache(
  authActionClient.metadata({ actionName: 'game_info_show' }).action(async () => {
    const player = await PlayerAction.get()?.then((x) => x?.data)

    if (!player) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const place = await Place({ posX: player.pos_x, posY: player.pos_y })

    return {
      player: {
        hasDefeated: player.hasDefeated,
        text: {
          defeated: i18n.t('character.state.defeated_long'),
        }
      },
      place: !!place
        ? {
            id: place.id as Location,
            subplaces: [
              place.hospital && { place: place.hospital, type: 'hospital' },
              place.armory && { place: place.armory, type: 'armory' },
              place.bank && { place: place.bank, type: 'bank' },
            ].filter((x) => !!x),
            text: {
              header: i18n.t('place.your_are_in', { place: place?.name }),
              description: place.description,
            },
          }
        : undefined,
      combat: player.hasCombat
        ? {
            enemyInstance: player.enemy_instance,
            text: {
              attack: i18n.t('action.attack'),
              runAway: i18n.t('action.run_away'),
              enemyAppear: i18n.t('enemy.appear', {
                enemy: `${i18n.t(`${player.enemy_instance?.enemy.i18n_key}.header` as any)} ${player.enemy_instance?.hp_actual}/${player.enemy_instance?.hp_max}`,
              }),
              
            },
          }
        : undefined,
      loot: player.hasLoot
        ? {
            ...player.loot,
            armors_loot: player.loot?.armors_loot
              ? player.loot?.armors_loot.map((x) => ({
                  ...x,
                  armor: { ...x.armor, name: i18n.t(`${x.armor.i18n_key}.header` as any) },
                }))
              : undefined,
            weapons_loot: player.loot?.weapons_loot
              ? player.loot?.weapons_loot.map((x) => ({
                  ...x,
                  weapon: { ...x.weapon, name: i18n.t(`${x.weapon.i18n_key}.header` as any) },
                }))
              : undefined,
            text: {
              loot: i18n.t('action.loot.header'),
              loot_found: i18n.t('action.loot.found'),
              reward: `${player.loot!.money} ${i18n.t('common.currency')}`,
            },
          }
        : undefined,
    }
  }),
)

export const checkEnemyAppeared = authActionClient
  .metadata({ actionName: 'game_check_enemy_appeared' })
  .action(async ({ ctx }) => {
    const place = await Place({ posX: ctx.user.pos_x, posY: ctx.user.pos_y })

    if (!place || place.place_type === 'SAFEHOUSE') return

    const enemies = await db.enemyInPlace.findMany({
      where: { place_id: place.id },
      include: { enemy: true },
    })

    if (!enemies.length) return

    const possiblePlaceEnemies = enemies.filter((e) => Number(e.spawn_rate) >= Math.random())

    if (!possiblePlaceEnemies.length) return

    const selectedPlaceEnemy = possiblePlaceEnemies[random(possiblePlaceEnemies.length)]

    const hp = random(selectedPlaceEnemy.enemy.hp_to, selectedPlaceEnemy.enemy.hp_from)

    return await db.user.update({
      where: { id: ctx.user.id },
      data: {
        enemy_instance: {
          create: {
            enemy_id: selectedPlaceEnemy.enemy.id,
            hp_actual: hp,
            hp_max: hp,
          },
        },
      },
    })
  })

export const attack = authActionClient.metadata({ actionName: 'game_attack' }).action(async () => {
  const player = (await PlayerAction.get())?.data

  if (!player) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  if (!player.hasCombat) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

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
    const inventory = (await InventoryAction.get())?.data

    if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

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

export const runAway = authActionClient.metadata({ actionName: 'game_runAway' }).action(async () => {
  const player = (await PlayerAction.get())?.data

  if (!player?.hasCombat) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  await db.enemyInstance.delete({ where: { id: player.enemy_instance!.id } })
})

export const loot = authActionClient.metadata({ actionName: 'game_loot' }).action(async () => {
  const player = (await PlayerAction.get())?.data

  if (!player?.hasLoot) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const inventory = (await InventoryAction.get())?.data!

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
  const player = (await PlayerAction.get())?.data

  if (!player) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const moneyActual = (player.money ?? 0) + (reward.money ?? 0)

  await db.user.update({
    where: { id: player.id },
    data: { money: moneyActual },
  })
}
