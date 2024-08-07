import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './inventory'
import TypedEventEmitter from '@/lib/emitter'
import type { Enemy } from '@prisma/client'

type EmitterEnemy = Enemy & { ctx: TRPCContext }

export const enemyEmitter = new TypedEventEmitter<{
  defeated: EmitterEnemy
}>()

export const gameRouter = createTRPCRouter({
  info: protectedProcedure.query(async ({ ctx }) => info(ctx)),
  inspectPosition: protectedProcedure.query(async ({ ctx }) => inspectPosition(ctx)),
  attack: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session?.user) throw new Error('User does not exist!')
    if (!ctx.session?.user?.enemy_instance || !ctx.session?.user?.enemy_instance_id)
      throw new Error('Enemy instance does not exist!')

    // const damageFromPlayer = random(ctx.session.user.damage_min, ctx.session.user.damage_max)
    const damageFromPlayer = 1000
    const damageFromEnemy = random(
      ctx.session.user.enemy_instance.enemy.damage_from ?? 0,
      ctx.session.user.enemy_instance.enemy.damage_to,
    )

    const actualPlayerHP = (ctx.session.user.hp_actual ?? 0) - damageFromEnemy
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
      const possibleEnemyXpGain = random(
        ctx.session.user.enemy_instance.enemy.xp_from ?? 0,
        ctx.session.user.enemy_instance.enemy.xp_to ?? 0,
      )
      const possibleEnemyMoneyGain = random(
        ctx.session.user.enemy_instance.enemy.money_from ?? 0,
        ctx.session.user.enemy_instance.enemy.money_to ?? 0,
      )

      const enemy = ctx.session.user.enemy_instance.enemy as Enemy

      await ctx.db.enemyInstance.delete({ where: { id: ctx.session.user.enemy_instance_id } })

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

        const xpActual = (ctx.session.user.xp_actual ?? 0) + possibleEnemyXpGain
        const xpMax = ctx.session.user.xp_max ?? 0
        const hasLevelUp = xpActual > xpMax

        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            xp_actual: hasLevelUp ? xpActual - xpMax : xpActual,
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
    if (!ctx.session?.user) throw new Error('User does not exist!')
    if (!ctx.session?.user?.enemy_instance || !ctx.session?.user?.enemy_instance_id)
      throw new Error('Enemy instance does not exist!')

    await ctx.db.enemyInstance.delete({ where: { id: ctx.session.user.enemy_instance_id } })
  }),
  loot: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session?.user) throw new Error('User does not exist!')
    if (!ctx.session?.user?.loot || !ctx.session?.user?.loot_id) throw new Error('Loot does not exist!')

    const inventoryId = (await getInventory(ctx))?.id

    const loot = ctx.session.user.loot

    if (!Boolean(loot)) return

    await ctx.db.$transaction(async (db) => {
      for (const l of loot.weapons_loot) {
        await db.weaponInInventory.create({
          data: {
            weapon_id: l.weapon_id,
            inventory_id: inventoryId,
          },
        })
      }
      for (const l of loot.armors_loot) {
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

      await collectReward({ db: db as any, session: ctx.session }, { money: loot.money })

      await db.user.update({
        where: { id: ctx.session.user!.id },
        data: { loot_id: null },
      })
    })
  }),
})

export async function collectReward(ctx: TRPCContext, reward: { money?: number | null }) {
  const moneyActual = (ctx.session!.user!.money ?? 0) + (reward.money ?? 0)

  await ctx.db.user.update({
    where: { id: ctx.session!.user!.id },
    data: {
      money: moneyActual,
    },
  })
}

async function info(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('User does not exist!')

  return {
    place: await ctx.db.place.findFirst({
      where: {
        pos_x: ctx.session.user.pos_x,
        pos_y: ctx.session.user.pos_y,
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
    enemyInstance: ctx.session.user.enemy_instance,
    loot: ctx.session.user.loot,
    defeated: ctx.session.user.defeated,
  }
}

export async function inspectPosition(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('User does not exist!')

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
