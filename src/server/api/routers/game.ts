import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const gameRouter = createTRPCRouter({
  position: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    })

    if (!user) return { place: undefined, enemy: undefined }

    const place = await ctx.db.place.findFirst({
      where: {
        pos_x: user.pos_x,
        pos_y: user.pos_y,
      },
      select: {
        name: true,
      },
    })

    if (place)
      return {
        place,
        enemy: undefined,
      }

    const isEnemy = Math.round(Math.random()) === 1

    return {
      place: undefined,
      enemy: isEnemy
        ? await ctx.db.enemy.findFirst({
            select: {
              name: true,
            },
          })
        : undefined,
    }
  }),
})
