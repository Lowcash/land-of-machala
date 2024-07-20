import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './inventory'
import { acceptQuest, getUserQuest } from './quest'
import type { TRPCContext } from '@/server/api/trpc'

export const hospitalRoute = createTRPCRouter({
  show: protectedProcedure.input(z.object({ hospitalId: z.string() })).query(async ({ ctx, input }) => {
    const hospital = await getHospital(ctx, input.hospitalId)
    const userQuest = await getUserQuest(ctx)

    return {
      ...hospital,
      quest: !userQuest.quest_slain_enemy,
    }
  }),
  resurect: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.update({
      where: { id: ctx.session.user!.id },
      data: { hp_actual: ctx.session.user!.hp_max, defeated: false },
    })
  }),
  heal: protectedProcedure.input(z.object({ hospitalId: z.string() })).mutation(async ({ ctx, input }) => {
    const hospital = await getHospital(ctx, input.hospitalId)

    const balance = ctx.session.user!.money - (hospital.price ?? 0)

    if (balance < 0) return { success: false }

    await ctx.db.user.update({
      where: { id: ctx.session.user!.id },
      data: {
        money: balance,
        hp_actual: ctx.session.user!.hp_max,
      },
    })

    return { success: true }
  }),
  buy: protectedProcedure
    .input(z.object({ hospitalId: z.string(), potionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const inventory = await getInventory(ctx)
      const hospital = await getHospital(ctx, input.hospitalId)

      const potion = hospital.potions_hospital.find((x) => x.potion_id === input.potionId)

      if (!potion) throw new Error('Potion does not exist!')

      const balance = ctx.session.user!.money - (potion.price ?? 0)

      if (balance < 0) return { success: false }

      const success = await ctx.db.$transaction(async (db) => {
        await db.user.update({
          where: { id: ctx.session.user!.id },
          data: {
            money: balance,
          },
        })

        await db.potionInInventory.create({
          data: {
            potion_id: potion.potion_id,
            inventory_id: inventory.id,
          },
        })

        return true
      })

      return { success }
    }),
  acceptSlainEnemyQuest: protectedProcedure.mutation(({ ctx }) => acceptQuest(ctx, 'SLAIN_ENEMY')),
})

export async function getHospital(ctx: TRPCContext, id: string) {
  const hospital = await ctx.db.hospital.findFirst({
    where: { id },
    include: { potions_hospital: { include: { potion: true } } },
  })

  if (!hospital) throw new Error('Hospital does not exist!')

  return hospital
}
