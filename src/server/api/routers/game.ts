import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './inventory'
import TypedEventEmitter from '@/lib/emitter'
import type { Enemy } from '@prisma/client'
import { getUser } from './user'

type EmitterEnemy = Enemy & { ctx: TRPCContext }

export const enemyEmitter = new TypedEventEmitter<{
  defeated: EmitterEnemy
}>()

export const gameRouter = createTRPCRouter({
  info: protectedProcedure.query(async ({ ctx }) => info(ctx)),
  inspectPosition: protectedProcedure.query(async ({ ctx }) => inspectPosition(ctx)),
  attack: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUser(ctx)

    if (!user.enemy_instance) throw new Error('Enemy instance does not exist!')

    // const damageFromPlayer = random(user.damage_min, user.damage_max)
    const damageFromPlayer = 1000
    const damageFromEnemy = random(
      user.enemy_instance.enemy.damage_from ?? 0,
      user.enemy_instance.enemy.damage_to,
    )

    const actualPlayerHP = (user.hp_actual ?? 0) - damageFromEnemy
    const actualEnemyHP = user.enemy_instance.hp_actual - damageFromPlayer

    await ctx.db.user.update({
      data: {
        hp_actual: actualPlayerHP,
      },
      where: { id: user.id },
    })

    const playerDefeated = actualPlayerHP <= 0
    const enemyDefeated = actualEnemyHP <= 0

    if (playerDefeated || enemyDefeated) {
      const possibleEnemyXpGain = random(
        user.enemy_instance.enemy.xp_from ?? 0,
        user.enemy_instance.enemy.xp_to ?? 0,
      )
      const possibleEnemyMoneyGain = random(
        user.enemy_instance.enemy.money_from ?? 0,
        user.enemy_instance.enemy.money_to ?? 0,
      )

      const enemy = user.enemy_instance.enemy

      await ctx.db.enemyInstance.delete({ where: { id: user.enemy_instance.id } })

      if (playerDefeated) {
        const inventory = await getInventory(ctx)

        await ctx.db.$transaction(async (db) => {
          await Promise.all([
            db.armorInInventory.deleteMany({
              where: { inventory_id: inventory.id },
            }),
            db.weaponInInventory.deleteMany({
              where: { inventory_id: inventory.id },
            }),
            db.potionInInventory.deleteMany({
              where: { inventory_id: inventory.id },
            }),
          ])

          await db.user.update({
            where: { id: ctx.session.user!.id },
            data: { defeated: true, money: 0, pos_x: 0, pos_y: 0 },
          })
        })
        return
      }

      if (enemyDefeated) {
        enemyEmitter.emit('defeated', { ...enemy, ctx })

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
            weapons_loot: {
              create: weapon ? [{ weapon: { connect: weapon } }] : undefined,
            },
            armors_loot: {
              create: armor ? [{ armor: { connect: armor } }] : undefined,
            },
            money: possibleEnemyMoneyGain,
          },
        })

        const xpActual = (user.xp_actual ?? 0) + possibleEnemyXpGain
        const xpMax = user.xp_max ?? 0
        const hasLevelUp = xpActual > xpMax

        await ctx.db.user.update({
          where: { id: user.id },
          data: {
            xp_actual: hasLevelUp ? xpActual - xpMax : xpActual,
            level: hasLevelUp ? user.level + 1 : user.level,
            loot: { connect: loot },
          },
        })
      }

      return
    }

    await ctx.db.enemyInstance.update({
      where: { id: user.enemy_instance.id },
      data: {
        hp_actual: actualEnemyHP,
      },
    })
  }),
  runAway: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUser(ctx)

    if (!user.enemy_instance)
      throw new Error('Enemy instance does not exist!')

    await ctx.db.enemyInstance.delete({ where: { id: user.enemy_instance.id } })
  }),
  loot: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await getUser(ctx)

    if (!user.loot) throw new Error('Loot does not exist!')

    const inventory = await getInventory(ctx)

    await ctx.db.$transaction(async (db) => {
      for (const l of user.loot!.weapons_loot) {
        await db.weaponInInventory.create({
          data: {
            weapon_id: l.weapon_id,
            inventory_id: inventory.id,
          },
        })
      }
      for (const l of user.loot!.armors_loot) {
        await db.armorInInventory.create({
          data: {
            armor_id: l.armor_id,
            inventory_id: inventory.id,
          },
        })
      }

      await db.weaponInLoot.deleteMany({
        where: { loot_id: user.loot!.id },
      })
      await db.armorInLoot.deleteMany({
        where: { loot_id: user.loot!.id },
      })
      await db.loot.delete({
        where: { id: user.loot!.id },
      })

      await collectReward({ ...ctx, db: db as any}, { money: user.loot!.money })

      await db.user.update({
        where: { id: user.id },
        data: { loot_id: null },
      })
    })
  }),
})

export async function collectReward(ctx: TRPCContext, reward: { money?: number | null }) {
  const user = await getUser(ctx)

  const moneyActual = (user.money ?? 0) + (reward.money ?? 0)

  await ctx.db.user.update({
    where: { id: user.id },
    data: {
      money: moneyActual,
    },
  })
}

async function info(ctx: TRPCContext) {
  const user = await getUser(ctx)

  return {
    place: await ctx.db.place.findFirst({
      where: {
        pos_x: user.pos_x,
        pos_y: user.pos_y,
      },
      include: {
        hospital: true,
        armory: {
          include: {
            weapons: { include: { weapon: true } },
            armors: { include: { armor: true } },
          },
        },
        bank: true,
      },
    }),
    enemyInstance: user.enemy_instance,
    loot: user.loot,
    defeated: user.defeated,
  }
}

export async function inspectPosition(ctx: TRPCContext) {
  const user = await getUser(ctx)

  const { enemyInstance, place } = await info(ctx)

  if (enemyInstance || place) return

  const hasEnemyAppear = Math.round(Math.random()) === 1

  const enemy =
    hasEnemyAppear &&
    (await ctx.db.enemy.findFirst({
      skip: random(await ctx.db.enemy.count()),
      take: 1,
    }))

  if (!!enemy) {
    const hp = random(enemy.hp_to, enemy.hp_from)

    await ctx.db.user.update({
      where: { id: user.id },
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
