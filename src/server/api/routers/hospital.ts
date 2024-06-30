import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const hospitalRoute = createTRPCRouter({
  heal: protectedProcedure.input(z.object({ hospitalId: z.string() })).mutation(async ({ ctx, input }) => {
    if (!ctx.session?.user) throw new Error('User does not exist!')

    const hospital = await ctx.db.hospital.findFirst({
      where: { id: input.hospitalId },
    })

    if (!hospital) throw new Error('Hospital does not exist!')

    const balance = ctx.session.user.money - (hospital.price ?? 0)

    if (balance < 0) return { success: false }

    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        money: balance,
        hp_actual: ctx.session.user.hp_max,
      },
    })

    return { success: true }
  }),
})
