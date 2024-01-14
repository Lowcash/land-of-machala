import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

import { DIRECTIONS } from '~/types/location'

export const playerRouter = createTRPCRouter({
  info: protectedProcedure.query(({ ctx }) =>
    ctx.db.user.findFirst({
      select: {
        name: true,
        race: true,
        profession: true,
        pos_x: true,
        pos_y: true,
        hp_actual: true,
        hp_max: true,
        mana_actual: true,
        mana_max: true,
        xp_actual: true,
        xp_max: true,
        money: true,
        level: true,
        damage_min: true,
        damage_max: true,
        strength: true,
        agility: true,
        intelligence: true,
      },
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

export async function initUser(db: PrismaClient) {
  const unassignedUser = await db.user.findFirst({
    where: {
      OR: [
        {
          race: null,
        },
        {
          profession: null,
        },
      ],
    },
  })

  if (!unassignedUser) return false

  return await db.user.update({
    data: { race: 'DWARF', profession: 'SAMURAI', hp_actual: 50, hp_max: 50, xp_actual: 0, xp_max: 100 },
    where: { id: unassignedUser.id },
  })
}
