'use server'

import { z } from 'zod'
import { cache } from 'react'
import { serverActionProcedure, protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { checkForEnemy } from './game'
import * as Player from '@/server/actions/_player'

import { PROFESSIONS, RACES } from '@/const'
import { DIRECTIONS, ERROR_CAUSE } from '@/const'

export const getSession = cache(serverActionProcedure.query(({ ctx }) => ctx.user))

export const get = protectedAction.query(async ({ ctx }) => {
  const player = await Player.get(ctx.user.id)

  if (!player) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return { ...player, canMove: await Player.canMove(player) }
})

export const hasCharacter = protectedAction.query(async () => {
  return Player.hasCharacter(await get())
})

export const hasLoot = protectedAction.query(async () => {
  return Player.hasLoot(await get())
})

export const isInCombat = protectedAction.query(async () => {
  return Player.isInCombat(await get())
})

export const create = protectedAction
  .input(
    z.object({
      race: z.enum(RACES),
      profession: z.enum(PROFESSIONS),
    }),
  )
  .mutation(({ ctx, input }) => Player.create(ctx.user.id, { race: input.race, profession: input.profession }))

export const move = protectedAction
  .input(z.object({ direction: z.enum(DIRECTIONS) }))
  .mutation(async ({ ctx, input }) => {
    const player = await get()

    if (!Player.canMove(player)) throw getTRPCErrorFromUnknown(ERROR_CAUSE.CANNOT_MOVE)

    await Player.move(ctx.user.id, { x: player.pos_x, y: player.pos_y }, input.direction)

    if (!(await Player.isSafe(player))) {
      await checkForEnemy()
    }
  })
