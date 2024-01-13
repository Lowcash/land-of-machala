import { PrismaClient } from '@prisma/client'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const gameRouter = createTRPCRouter({
  init: protectedProcedure.query(async ({ ctx }) => {
    await initUser(ctx.db)
    await initPlaces(ctx.db)
    await initEnemies(ctx.db)

    return true
  }),
  position: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    })

    if (!user) return false

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

async function initUser(db: PrismaClient) {
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

  if (!unassignedUser) return true

  return await db.user.update({
    data: { race: 'DWARF', profession: 'SAMURAI' },
    where: { id: unassignedUser.id },
  })
}

async function initPlaces(db: PrismaClient) {
  if ((await db.place.count()) > 0) return true

  await db.place.createMany({
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
    skipDuplicates: true,
  })
}

async function initEnemies(db: PrismaClient) {
  if ((await db.enemy.count()) > 0) return true

  await db.enemy.createMany({
    data: [
      {
        id: 'enemy-1',
        name: 'Thymiáš',
      },
      {
        id: 'enemy-2',
        name: 'Bubák',
      },
    ],
    skipDuplicates: true,
  })
}
