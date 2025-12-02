'use server'

import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { db } from '@/lib/db'
import { cache } from 'react'
import { random } from '@/lib/utils'
import type { Location } from '@/types'
import { playerProcedure } from '@/lib/safe-action'

import { get as getPlace } from '@/entity/place'
import { hasCombat, hasLoot } from '@/entity/player'
import { defeatePlayer, respawnPlayer, defeateEnemy } from '@/lib/manager/game'
import { assignReward, collectReward } from '@/lib/manager/reward'
import { updateState } from '@/lib/manager/quest'

import { ERROR_CAUSE, ENEMY_IMAGE } from '@/config'

export const showInfo = cache(
  playerProcedure
    .createServerAction()
    .input(z.object({}).optional())
    .handler(async ({ ctx }) => {
      const t = await getTranslations()

      const place = await getPlace({ posX: ctx.player.pos_x, posY: ctx.player.pos_y })

      return {
        player: {
          defeated: ctx.player.defeated,
          text: {
            defeated: t('character.state.defeated_long'),
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
                header: t('place.your_are_in', { place: place?.name }),
                description: place.description,
              },
            }
          : undefined,
        combat: hasCombat(ctx.player)
          ? {
              enemyInstance: {
                ...ctx.player.enemy_instance,
                image: ENEMY_IMAGE[ctx.player.enemy_instance.enemy.id],
              },
              text: {
                attack: t('action.attack'),
                runAway: t('action.run_away'),
                enemyAppear: t('enemy.appear', {
                  enemy: `${ctx.player.enemy_instance.enemy.name} ${ctx.player.enemy_instance.hp_actual}/${ctx.player.enemy_instance.hp_max}`,
                }),
              },
            }
          : undefined,
        loot: hasLoot(ctx.player)
          ? {
              ...ctx.player.loot,
              armors_loot: ctx.player.loot.armors_loot.map((x) => ({ ...x, text: { reward: `👕  ${x.armor.name}` } })),
              weapons_loot: ctx.player.loot.weapons_loot.map((x) => ({
                ...x,
                text: { reward: `🗡️ ${x.weapon.name}` },
              })),
              text: {
                loot: t('action.loot.header'),
                loot_found: t('action.loot.found'),
                reward_money: `💰 ${ctx.player.loot.money} ${t('common.currency')}`,
                reward_xp: `⭐️ ${ctx.player.loot.xp} ${t('common.XP')}`,
              },
            }
          : undefined,
      }
    }),
)

export const attack = playerProcedure
  .createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    if (!hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    // const damageFromPlayer = random(ctx.player.damage_min, ctx.player.damage_max)
    const damageFromPlayer = 1000
    const damageFromEnemy = random(
      ctx.player.enemy_instance.enemy.damage_from,
      ctx.player.enemy_instance.enemy.damage_to,
    )

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
        await defeatePlayer(dbTransaction, ctx.player)
        await respawnPlayer(dbTransaction, ctx.player)
      })

      return
    }

    if (enemyDefeated) {
      await db.$transaction(async (dbTransaction) => {
        if (!hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const defeatedEnemyRes = await defeateEnemy(dbTransaction, ctx.player, ctx.player.enemy_instance)

        if (!!defeatedEnemyRes?.reward) await assignReward(dbTransaction, ctx.player, defeatedEnemyRes.reward)

        await updateState(dbTransaction, ctx.player, { slainedEnemy: ctx.player.enemy_instance.enemy })
      })

      return
    }
  })

export const runAway = playerProcedure
  .createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) =>
    db.$transaction(async (dbTransaction) => {
      if (!hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      await defeateEnemy(dbTransaction, ctx.player, ctx.player.enemy_instance, { noReward: true })
    }),
  )

export const loot = playerProcedure
  .createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) =>
    db.$transaction(async (dbTransaction) => {
      if (!hasLoot(ctx.player)) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      await collectReward(dbTransaction, ctx.player, ctx.player.loot!)
    }),
  )
