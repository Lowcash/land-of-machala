'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { cache } from 'react'
import { random } from '@/lib/utils'
import type { Location } from '@/types'
import { playerActionClient } from '@/lib/safe-action'

import * as PlaceEntity from '@/entity/place'
import * as PlayerEntity from '@/entity/player'
import * as GameManager from '@/lib/manager/game'
import * as RewardManager from '@/lib/manager/reward'
import * as QuestManager from '@/lib/manager/quest'

import { ERROR_CAUSE } from '@/config'

export const showInfo = cache(
  playerActionClient.metadata({ actionName: 'game_show_info' }).action(async ({ ctx }) => {
    const place = await PlaceEntity.get({ posX: ctx.player.pos_x, posY: ctx.player.pos_y })

    return {
      player: {
        defeated: ctx.player.defeated,
        text: {
          defeated: i18n.t('character.state.defeated_long'),
        },
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
      combat: PlayerEntity.hasCombat(ctx.player)
        ? {
            enemyInstance: ctx.player.enemy_instance,
            text: {
              attack: i18n.t('action.attack'),
              runAway: i18n.t('action.run_away'),
              enemyAppear: i18n.t('enemy.appear', {
                enemy: `${i18n.t(`${ctx.player.enemy_instance.enemy.i18n_key}.header` as any)} ${ctx.player.enemy_instance.hp_actual}/${ctx.player.enemy_instance.hp_max}`,
              }),
            },
          }
        : undefined,
      loot: PlayerEntity.hasLoot(ctx.player)
        ? {
            ...ctx.player.loot,
            text: {
              loot: i18n.t('action.loot.header'),
              loot_found: i18n.t('action.loot.found'),
              reward_money: `${ctx.player.loot.money} ${i18n.t('common.currency')}`,
              reward_xp: `+ ${ctx.player.loot.xp} ${i18n.t('common.XP')}`,
            },
          }
        : undefined,
    }
  }),
)

export const attack = playerActionClient.metadata({ actionName: 'game_attack' }).action(async ({ ctx }) => {
  if (!PlayerEntity.hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const damageFromPlayer = random(ctx.player.damage_min, ctx.player.damage_max)
  const damageFromEnemy = random(ctx.player.enemy_instance.enemy.damage_from, ctx.player.enemy_instance.enemy.damage_to)

  const actualPlayerHP = ctx.player.hp_actual - damageFromEnemy
  const actualEnemyHP = ctx.player.enemy_instance.hp_actual - damageFromPlayer

  console.debug(`⚔️ [player: ${damageFromPlayer}; ${ctx.player.enemy_instance.enemy.id}: ${damageFromEnemy}]`)
  console.debug(`❤️ [player: ${actualPlayerHP}; ${ctx.player.enemy_instance.enemy.id}: ${actualEnemyHP}]`)

  await db.user.update({
    where: { id: ctx.player.id },
    data: {
      hp_actual: actualPlayerHP,
    },
  })

  const playerDefeated = actualPlayerHP <= 0
  const enemyDefeated = actualEnemyHP <= 0

  if (!playerDefeated && !enemyDefeated) {
    await db.enemyInstance.update({
      where: { id: ctx.player.enemy_instance_id },
      data: {
        hp_actual: actualEnemyHP,
      },
    })

    return
  }

  if (playerDefeated) {
    await db.$transaction(async (dbTransaction) => {
      await GameManager.defeatePlayer(dbTransaction, ctx.player)
      await GameManager.respawnPlayer(dbTransaction, ctx.player)
    })

    return
  }

  if (enemyDefeated) {
    await db.$transaction(async (dbTransaction) => {
      if (!PlayerEntity.hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      const defeatedEnemyRes = await GameManager.defeateEnemy(dbTransaction, ctx.player, ctx.player.enemy_instance)

      if (!!defeatedEnemyRes?.reward)
        await RewardManager.assignReward(dbTransaction, ctx.player, defeatedEnemyRes.reward)

      await QuestManager.updateState(dbTransaction, ctx.player, { slainedEnemy: ctx.player.enemy_instance.enemy })
    })

    return
  }
})

export const runAway = playerActionClient.metadata({ actionName: 'game_run_away' }).action(async ({ ctx }) =>
  db.$transaction(async (dbTransaction) => {
    if (!PlayerEntity.hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await GameManager.defeateEnemy(dbTransaction, ctx.player, ctx.player.enemy_instance, { noReward: true })
  }),
)

export const loot = playerActionClient.metadata({ actionName: 'game_loot' }).action(async ({ ctx }) =>
  db.$transaction(async (dbTransaction) => {
    if (!PlayerEntity.hasLoot(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await RewardManager.collectReward(dbTransaction, ctx.player, ctx.player.loot)
  }),
)
