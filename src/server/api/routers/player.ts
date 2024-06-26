import { z } from 'zod'
import { inspectPosition } from './game'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

import { DIRECTIONS } from '@/types/location'

export const playerRouter = createTRPCRouter({
  info: protectedProcedure.query(({ ctx }) => ctx.session.user),
  move: protectedProcedure.input(z.enum(DIRECTIONS)).mutation(async ({ ctx, input }) => {
    const canMove = !Boolean(ctx.session.user.enemy_instance) && !Boolean(ctx.session.user.loot)

    if (!canMove)
      return {
        pos_x: ctx.session.user.pos_x,
        pos_y: ctx.session.user.pos_y,
      }

    const horizontal = input === 'left' ? -1 : input === 'right' ? 1 : 0
    const vertical = input === 'down' ? -1 : input === 'up' ? 1 : 0

    const position = ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        pos_x: ctx.session.user.pos_x + horizontal,
        pos_y: ctx.session.user.pos_y + vertical,
      },
      select: {
        pos_x: true,
        pos_y: true,
      },
    })

    await inspectPosition(ctx)

    return position
  }),
})
