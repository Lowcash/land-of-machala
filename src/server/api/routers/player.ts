import { z } from 'zod'
import { inspectPosition } from './game'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

import { DIRECTIONS, WEARABLE } from '@/types/location'

export const playerRouter = createTRPCRouter({
  info: protectedProcedure.query(({ ctx }) => ctx.session.user),
  inventory: protectedProcedure.query(({ ctx }) => ctx.session.user.inventory),
  wear: protectedProcedure
    .input(z.object({ type: z.enum(WEARABLE), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let wearableId = ctx.session.user.wearable_id

      if (!Boolean(wearableId)) {
        const wearable = await ctx.db.wearable.create({ data: {} })

        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            wearable: { connect: wearable },
          },
        })

        wearableId = wearable.id
      }

      switch (input.type) {
        case 'weapon':
          const weapons = (
            await ctx.db.user.findFirst({
              where: { id: ctx.session.user.id },
              include: { inventory: { include: { weapons: { include: { weapon: true } } } } },
            })
          ).inventory.weapons

          console.log(weapons)
          console.log(input.id)

          await ctx.db.wearable.update({
            where: { id: wearableId },
            data: { left_hand_weapon_id: input.id },
          })

          break
        case 'armor':
          break
      }
    }),
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
