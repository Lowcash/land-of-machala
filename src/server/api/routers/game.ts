import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './player'

export const gameRouter = createTRPCRouter({
  info: protectedProcedure.query(async ({ ctx }) => info(ctx)),
  inspectPosition: protectedProcedure.query(async ({ ctx }) => inspectPosition(ctx)),
  attack: protectedProcedure.mutation(async ({ ctx }) => {
    // const damageFromPlayer = random(ctx.session.user.damage_min, ctx.session.user.damage_max)
    const damageFromPlayer = 1000
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
      const possibleEnemyXpGain = random(ctx.session.user.enemy_instance.enemy.xp_from, ctx.session.user.enemy_instance.enemy.xp_to)

      await ctx.db.enemyInstance.delete({ where: { id: ctx.session.user.enemy_instance_id } })

      if (playerDefeated) {
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            hp_actual: ctx.session.user.hp_max,
          },
        })
        return
      }

      if (enemyDefeated) {
        const weapon = await ctx.db.weapon.findFirst({
          skip: random(await ctx.db.weapon.count()),
          take: 1,
        })
        const armor = await ctx.db.armor.findFirst({
          skip: random(await ctx.db.armor.count()),
          take: 1,
        })

        const loot = await ctx.db.loot.create({
          data: {
            weapons: {
              create: [{ weapon: { connect: weapon } }],
            },
            armors: {
              create: [{ armor: { connect: armor } }],
            },
          },
        })

        const xpActual = (ctx.session.user.xp_actual ?? 0) + possibleEnemyXpGain
        const hasLevelUp = xpActual > ctx.session.user.xp_max

        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            xp_actual: hasLevelUp ? xpActual - ctx.session.user.xp_max : xpActual,
            level: hasLevelUp ? ctx.session.user.level + 1 : ctx.session.user.level,
            loot: { connect: loot },
          },
        })
      }

      return
    }

    await ctx.db.enemyInstance.update({
      where: { id: ctx.session.user.enemy_instance_id },
      data: {
        hp_actual: actualEnemyHP,
      },
    })
  }),
  runAway: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.enemyInstance.delete({ where: { id: ctx.session.user.enemy_instance_id } })
  }),
  loot: protectedProcedure.mutation(async ({ ctx }) => {
    const inventoryId = (await getInventory(ctx))?.id

    const loot = ctx.session.user.loot

    if (!Boolean(loot)) return

    await ctx.db.$transaction(async (db: any) => {
      for (const l of loot.weapons) {
        await db.weaponInInventory.create({
          data: {
            weapon_id: l.weapon_id,
            inventory_id: inventoryId,
          },
        })
      }
      for (const l of loot.armors) {
        await db.armorInInventory.create({
          data: {
            armor_id: l.armor_id,
            inventory_id: inventoryId,
          },
        })
      }

      await db.weaponInLoot.deleteMany({
        where: { loot_id: loot.id },
      })
      await db.armorInLoot.deleteMany({
        where: { loot_id: loot.id },
      })
      await db.loot.delete({
        where: { id: loot.id },
      })

      await db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          loot_id: null,
        },
      })
    })
  }),
})

async function info(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('No user!')

  return {
    place: await ctx.db.place.findFirst({
      where: {
        pos_x: ctx.session.user.pos_x,
        pos_y: ctx.session.user.pos_y,
      },
      select: {
        name: true,
      },
    }),
    enemyInstance: ctx.session.user.enemy_instance,
    loot: ctx.session.user.loot,
  }
}

export async function inspectPosition(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('No user!')

  const { enemyInstance, place } = await info(ctx)

  if (enemyInstance || place) return

  const hasEnemyAppear = Math.round(Math.random()) === 1

  const enemy =
    hasEnemyAppear &&
    (await ctx.db.enemy.findFirst({
      skip: random(await ctx.db.enemy.count()),
      take: 1,
    }))

  if (Boolean(enemy)) {
    const hp = random(enemy.hp_to, enemy.hp_from)

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
  }
}

function random(to: number, from: number = 0) {
  return Math.floor(Math.random() * (to - from)) + from
}
