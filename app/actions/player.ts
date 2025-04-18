'use server'

import i18n from '@/lib/i18n'
import { cache } from 'react'
import { db } from '@/lib/db'
import type { User } from '@prisma/client'

import { authActionClient } from '@/lib/safe-action'
import { playerMoveSchema } from '@/zod-schema/player'

import * as GameAction from './game'
import * as PlaceAction from './place'

import { ERROR_CAUSE } from '@/config'

export const show = authActionClient.metadata({ actionName: 'player_show' }).action(async () => {
  const player = await get().then((x) => x?.data)

  return {
    ...player,
    text: {
      character: i18n.t('character.header'),
      race: i18n.t('race.header'),
      class: i18n.t('class.header'),
      money: i18n.t('character.money'),
      currency: i18n.t('character.currency'),
      hp: i18n.t('character.hp'),
      pos_x: i18n.t('character.pos_x'),
      pos_y: i18n.t('character.pos_y'),
    },
  }
})

export const move = authActionClient
  .metadata({ actionName: 'player_move' })
  .schema(playerMoveSchema)
  .action(async ({ ctx, parsedInput }) => {
    if (!canMove(ctx.user)) throw new Error(ERROR_CAUSE.CANNOT_MOVE)

    const horizontal = parsedInput.direction === 'left' ? -1 : parsedInput.direction === 'right' ? 1 : 0
    const vertical = parsedInput.direction === 'down' ? -1 : parsedInput.direction === 'up' ? 1 : 0

    const movedPlayer = await db.user.update({
      where: { id: ctx.user.id },
      data: {
        pos_x: ctx.user.pos_x + horizontal,
        pos_y: ctx.user.pos_y + vertical,
      },
      include: {},
    })

    if (!(await isSafe(movedPlayer))?.data) {
      await GameAction.checkForEnemy()
    }
  })

export const get = cache(
  authActionClient.metadata({ actionName: 'player_get' }).action(async ({ ctx }) => {
    const player = await db.user.findFirst({
      where: { id: ctx.user.id },
      include: {
        race: true,
        class: true,
        enemy_instance: { include: { enemy: true } },
        loot: {
          include: {
            armors_loot: { include: { armor: true } },
            weapons_loot: { include: { weapon: true } },
          },
        },
      },
    })

    if (!player) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (!player.race || !player.class) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...player,
      race: {
        ...player.race,
        name: i18n.t(`${player.race.i18n_key}.header` as any),
      },
      class: {
        ...player.class,
        name: i18n.t(`${player.class.i18n_key}.header` as any),
      },
      hasCharacter: hasCharacter(player),
      hasLoot: hasLoot(player),
      canMove: canMove(player),
      isSafe: isSafe(player),
      isInCombat: isInCombat(player),
      isDefeated: isDefeated(player),
    }
  }),
)

function isSafe(player: User) {
  return isInPlace({ x: player.pos_x, y: player.pos_y })
}

function isInPlace(position: Coordinates) {
  return PlaceAction.get({ posX: position.x, posY: position.y })
}

function canMove(player: User) {
  return !isInCombat(player) && !isDefeated(player) && !hasLoot(player)
}

function isInCombat(player: User) {
  return !!player.enemy_instance_id
}

function isDefeated(player: User) {
  return !!player.defeated
}

function hasCharacter(player: User) {
  return !!player.race_id && !!player.class_id
}

function hasLoot(player: User) {
  return !!player.loot_id
}
