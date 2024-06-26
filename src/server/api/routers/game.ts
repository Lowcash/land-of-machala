import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const gameRouter = createTRPCRouter({
  info: protectedProcedure.query(async ({ ctx }) => info(ctx)),
  inspectPosition: protectedProcedure.query(async ({ ctx }) => inspectPosition(ctx)),
  attack: protectedProcedure.mutation(async ({ ctx }) => {
    // const damageFromPlayer = random(ctx.session.user.damage_min, ctx.session.user.damage_max)
    const damageFromPlayer = 10
    const damageFromEnemy = random(
      ctx.session.user.enemy_instance.enemy.damage_from,
      ctx.session.user.enemy_instance.enemy.damage_to,
    )

    const actualPlayerHP = ctx.session.user.hp_actual - damageFromEnemy
    const actualEnemyHP = ctx.session.user.enemy_instance.hp_actual - damageFromPlayer

    await ctx.db.user.update({
      data: {
        hp_actual: actualPlayerHP,
      },
      where: { id: ctx.session.user.id },
    })

    const playerDefeated = actualPlayerHP <= 0
    const enemyDefeated = actualEnemyHP <= 0

    if (playerDefeated || enemyDefeated) {
      await ctx.db.enemyInstance.delete({ where: { id: ctx.session.user.enemy_instance_id } })

      if (playerDefeated) {
        await ctx.db.user.update({
          data: {
            hp_actual: ctx.session.user.hp_max,
          },
          where: { id: ctx.session.user.id },
        })

        return { playerDefeated: true }
      }

      return {
        enemyDefeated: true,
        loot: await ctx.db.weapon.findFirst({
          skip: random(await ctx.db.weapon.count()),
          take: 1,
        }),
      }
    }

    await ctx.db.enemyInstance.update({
      data: {
        hp_actual: actualEnemyHP,
      },
      where: { id: ctx.session.user.enemy_instance_id },
    })
  }),
  runAway: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.enemyInstance.delete({ where: { id: ctx.session.user.enemy_instance_id } })
  }),
})

async function info(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('No user!')

  const place = await ctx.db.place.findFirst({
    where: {
      pos_x: ctx.session.user.pos_x,
      pos_y: ctx.session.user.pos_y,
    },
    select: {
      name: true,
    },
  })

  if (Boolean(place)) return { place }

  const enemyInstance = ctx?.session?.user.enemy_instance

  if (Boolean(enemyInstance))
    return {
      enemy: { name: enemyInstance.enemy.name, hp_actual: enemyInstance.hp_actual, hp_max: enemyInstance.hp_max },
    }

  return {}
}

export async function inspectPosition(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('No user!')

  const gameInfo = await info(ctx)

  if (gameInfo?.enemy || gameInfo?.place) return { enemy: gameInfo?.enemy, place: gameInfo?.place }

  const hasEnemyAppear = Math.round(Math.random()) === 1

  const enemy =
    hasEnemyAppear &&
    (await ctx.db.enemy.findFirst({
      skip: random(await ctx.db.enemy.count()),
      take: 1,
    }))

  if (Boolean(enemy)) {
    const hp = random(enemy.hp_to, enemy.hp_from)

    const enemyInstance = (
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
        include: { enemy_instance: { select: { enemy: true, hp_actual: true, hp_max: true } } },
      })
    ).enemy_instance

    return {
      enemy: { name: enemyInstance.enemy.name, hp_actual: enemyInstance.hp_actual, hp_max: enemyInstance.hp_max },
    }
  }

  return {}
}

function random(to: number, from: number = 0) {
  return Math.floor(Math.random() * (to - from)) + from
}
