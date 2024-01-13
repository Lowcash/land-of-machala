import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

import { DIRECTIONS } from '~/types/location'

export const playerRouter = createTRPCRouter({
  info: protectedProcedure.query(({ ctx }) =>
    ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    }),
  ),
  move: protectedProcedure.input(z.enum(DIRECTIONS)).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    })

    if (!user) return

    const horizontal = input === 'left' ? -1 : input === 'right' ? 1 : 0
    const vertical = input === 'down' ? -1 : input === 'up' ? 1 : 0

    return ctx.db.user.update({
      data: {
        pos_x: user.pos_x + horizontal,
        pos_y: user.pos_y + vertical,
      },
      where: { id: ctx.session.user.id },
      select: {
        pos_x: true,
        pos_y: true,
      },
    })
  }),
})
