import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const gameRouter = createTRPCRouter({
  init: protectedProcedure.query(async ({ ctx }) => {
    if ((await ctx.db.place.count()) > 0) return

    await ctx.db.place.createMany({
      data: [
        {
          id: 'city-1',
          name: 'Lowcash Land',
          pos_x: 0,
          pos_y: 0,
        },
        {
          id: 'city-2',
          name: 'Highcash Land',
          pos_x: 1,
          pos_y: 1,
        },
      ],
    })
  }),
  checkPlace: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    })

    if (!user) return

    return ctx.db.place.findFirst({
      where: {
        pos_x: user.pos_x,
        pos_y: user.pos_y,
      },
      select: {
        name: true,
      },
    })
  }),
})
