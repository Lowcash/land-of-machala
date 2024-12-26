'use server'

import { z } from 'zod'
import { cache } from 'react'
import { db } from '@/server/db'
import type { User } from '@prisma/client'
import { serverActionProcedure, protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import * as GameAction from './game'
import * as PlaceAction from '@/server/actions/place'

import { PROFESSIONS, RACES } from '@/const'
import { DIRECTIONS, ERROR_CAUSE } from '@/const'

export const getSession = cache(serverActionProcedure.query(({ ctx }) => ctx.user))

export const get = cache(
  protectedAction.query(async ({ ctx }) => {
    const player = await db.user.findFirst({
      where: { id: ctx.user.id },
      include: {
        enemy_instance: { include: { enemy: true } },
        loot: {
          include: {
            armors_loot: { include: { armor: true } },
            weapons_loot: { include: { weapon: true } },
          },
        },
      },
    })

    if (!player) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...player,
      hasCharacter: hasCharacter(player),
      isSafe: isSafe(player),
      canMove: canMove(player),
      isInCombat: isInCombat(player),
      isDefeated: isDefeated(player),
      hasLoot: hasLoot(player),
    }
  }),
)

function hasCharacter(player: User) {
  return hasRace(player) && hasProfession(player)
}

function hasRace(player: User) {
  return !!player.race
}

function hasProfession(player: User) {
  return !!player.profession
}

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

export const create = protectedAction
  .input(
    z.object({
      race: z.enum(RACES),
      profession: z.enum(PROFESSIONS),
    }),
  )
  .mutation(({ ctx, input }) =>
    db.user.update({
      where: { id: ctx.user.id },
      data: {
        race: input.race,
        profession: input.profession,
        hp_actual: 100,
        hp_max: 100,
        xp_actual: 0,
        xp_max: 100,
      },
    }),
  )

export const move = protectedAction
  .input(z.object({ direction: z.enum(DIRECTIONS) }))
  .mutation(async ({ ctx, input }) => {
    const player = await get()

    if (!canMove(player)) throw getTRPCErrorFromUnknown(ERROR_CAUSE.CANNOT_MOVE)

    const horizontal = input.direction === 'left' ? -1 : input.direction === 'right' ? 1 : 0
    const vertical = input.direction === 'down' ? -1 : input.direction === 'up' ? 1 : 0

    const movedPlayer = await db.user.update({
      where: { id: ctx.user.id },
      data: {
        pos_x: player.pos_x + horizontal,
        pos_y: player.pos_y + vertical,
      },
      include: {},
    })

    if (!(await isSafe(movedPlayer))) {
      await GameAction.checkForEnemy()
    }
  })
