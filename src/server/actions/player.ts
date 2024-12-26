'use server'

import { z } from 'zod'
import { cache } from 'react'
import { db } from '@/server/db'
import { serverActionProcedure, protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import * as _Player from './_player'
import * as GameAction from './game'

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
      hasCharacter: _Player.hasCharacter(player),
      isSafe: _Player.isSafe(player),
      canMove: _Player.canMove(player),
      isInCombat: _Player.isInCombat(player),
      isDefeated: _Player.isDefeated(player),
      hasLoot: _Player.hasLoot(player),
    }
  }),
)

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

    if (!_Player.canMove(player)) throw getTRPCErrorFromUnknown(ERROR_CAUSE.CANNOT_MOVE)

    const horizontal = input.direction === 'left' ? -1 : input.direction === 'right' ? 1 : 0
    const vertical = input.direction === 'down' ? -1 : input.direction === 'up' ? 1 : 0

    await db.user.update({
      where: { id: ctx.user.id },
      data: {
        pos_x: player.pos_x + horizontal,
        pos_y: player.pos_y + vertical,
      },
    })

    if (!(await _Player.isSafe(player))) {
      await GameAction.checkForEnemy()
    }
  })
