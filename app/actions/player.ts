'use server'

import { cache } from 'react'
import { db } from '@/lib/db'
import type { User } from '@prisma/client'

import { authActionClient } from '@/lib/safe-action'
import { playerMoveSchema } from '@/zod-schema/player'

import * as GameAction from './game'
import * as PlaceAction from './place'

import { ERROR_CAUSE } from '@/config'

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

    const hasRace = !!player.race
    const hasClass = !!player.class

    return {
      ...player,
      hasCharacter: hasRace && hasClass,
      isSafe: isSafe(player),
      canMove: canMove(player),
      isInCombat: isInCombat(player),
      isDefeated: isDefeated(player),
      hasLoot: hasLoot(player),
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

function hasLoot(player: User) {
  return !!player.loot_id
}

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
