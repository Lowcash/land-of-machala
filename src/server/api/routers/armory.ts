import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const armoryRoute = createTRPCRouter({
  show: protectedProcedure.input(z.object({ armoryId: z.string() })).query(async ({ ctx, input }) => {
    if (!ctx.session?.user) throw new Error('User does not exist!')

    const armory = await ctx.db.armory.findFirst({
      where: { id: input.armoryId },
      include: { weapons: { include: { weapon: true } }, armors: { include: { armor: true } } },
    })

    if (!armory) throw new Error('Armory does not exist!')

    return armory
  }),
})
