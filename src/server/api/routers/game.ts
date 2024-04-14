import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const gameRouter = createTRPCRouter({
  position: protectedProcedure.query(async ({ ctx }) => {
    const place = await ctx.db.place.findFirst({
      where: {
        pos_x: ctx.session.user.pos_x,
        pos_y: ctx.session.user.pos_y,
      },
      select: {
        name: true,
      },
    })

    if (Boolean(place)) return { place, enemy: undefined }

    const enemyInstance = ctx.session.user.enemy_instance

    if (Boolean(enemyInstance)) return { place: undefined, enemy: enemyInstance.enemy }

    const enemy =
      Math.round(Math.random()) === 1 &&
      (await ctx.db.enemy.findFirst({
        skip: random(await ctx.db.enemy.count()),
        take: 1,
      }))

    if (Boolean(enemy)) {
      const hp = random(enemy.hp_to, enemy.hp_from)

      return {
        place: undefined,
        enemy: (
          await ctx.db.user.update({
            where: { id: ctx.session.user.id },
            data: {
              enemy_instance: {
                create: {
                  enemy: { connect: enemy },
                  hp_actual: hp,
                  hp_max: hp,
                },
              },
            },
            include: { enemy_instance: { select: { enemy: true } } },
          })
        ).enemy_instance.enemy,
      }
    }

    return { place: undefined, enemy: undefined }
  }),
})

function random(to: number, from: number = 0) {
  return Math.floor(Math.random() * (to - from)) + from
}
