import { z } from 'zod'
import { inspectPosition } from './game'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './inventory'
import { ArmorType } from '@prisma/client'
import { getUser } from './user'

import { DIRECTIONS, PROFESSIONS, RACES, WEARABLES } from '@/const'

export const playerRouter = createTRPCRouter({
  info: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser(ctx)

    const canMove =
      !Boolean(user.enemy_instance) &&
      !Boolean(user.loot) &&
      !Boolean(user.defeated)

    return {
      ...user,
      canMove,
    }
  }),
  create: protectedProcedure
    .input(
      z.object({
        race: z.enum(RACES),
        profession: z.enum(PROFESSIONS),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error('No user!')

      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          race: input.race,
          profession: input.profession,
          hp_actual: 100,
          hp_max: 100,
          xp_actual: 0,
          xp_max: 100,
        },
      })
    }),
  stats: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUser(ctx)
    const wearable = await getWearable(ctx)

    const strength =
      (wearable?.head?.armor?.strength ?? 0) +
      (wearable?.shoulder?.armor?.strength ?? 0) +
      (wearable?.chest?.armor?.strength ?? 0) +
      (wearable?.hand?.armor?.strength ?? 0) +
      (wearable?.pants?.armor?.strength ?? 0) +
      (wearable?.boots?.armor?.strength ?? 0)

    const agility =
      (wearable?.head?.armor?.agility ?? 0) +
      (wearable?.shoulder?.armor?.agility ?? 0) +
      (wearable?.chest?.armor?.agility ?? 0) +
      (wearable?.hand?.armor?.agility ?? 0) +
      (wearable?.pants?.armor?.agility ?? 0) +
      (wearable?.boots?.armor?.agility ?? 0)

    const intelligence =
      (wearable?.head?.armor?.intelligency ?? 0) +
      (wearable?.shoulder?.armor?.intelligency ?? 0) +
      (wearable?.chest?.armor?.intelligency ?? 0) +
      (wearable?.hand?.armor?.intelligency ?? 0) +
      (wearable?.pants?.armor?.intelligency ?? 0) +
      (wearable?.boots?.armor?.intelligency ?? 0)

    const damage_min =
      (wearable?.left_hand?.weapon?.damage_from ?? 0) + (wearable?.right_hand?.weapon?.damage_from ?? 0)
    const damage_max = (wearable?.left_hand?.weapon?.damage_to ?? 0) + (wearable?.right_hand?.weapon.damage_to ?? 0)

    await ctx.db.user.update({
      where: { id: user.id },
      data: { damage_min, damage_max, strength, agility, intelligence },
    })

    return {
      level: user.level,
      damage_min,
      damage_max,
      strength,
      agility,
      intelligence,
    }
  }),
  wearable: protectedProcedure.query(async ({ ctx }) => {
    const wearable = await getWearable(ctx)

    return {
      leftHand: wearable?.left_hand?.weapon,
      rightHand: wearable?.right_hand?.weapon,
      head: wearable?.head?.armor,
      shoulder: wearable?.shoulder?.armor,
      chest: wearable?.chest?.armor,
      hand: wearable?.hand?.armor,
      pants: wearable?.pants?.armor,
      boots: wearable?.boots?.armor,
    }
  }),
  wear: protectedProcedure
    .input(z.object({ type: z.enum(WEARABLES), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUser(ctx)
      const canWear = !Boolean(user.enemy_instance)

      if (!canWear) return

      const wearableId = (await getWearable(ctx))?.id

      switch (input.type) {
        case 'left_weapon':
          const left = await ctx.db.wearable.update({
            where: { id: wearableId },
            data: { left_hand_weapon_id: input.id },
            select: { left_hand_weapon_id: true, right_hand_weapon_id: true },
          })

          if (left.left_hand_weapon_id === left.right_hand_weapon_id)
            await ctx.db.wearable.update({
              where: { id: wearableId },
              data: {
                right_hand_weapon_id: null,
              },
            })

          break
        case 'right_weapon':
          const right = await ctx.db.wearable.update({
            where: { id: wearableId },
            data: { right_hand_weapon_id: input.id },
            select: { left_hand_weapon_id: true, right_hand_weapon_id: true },
          })

          if (right.left_hand_weapon_id === right.right_hand_weapon_id)
            await ctx.db.wearable.update({
              where: { id: wearableId },
              data: {
                left_hand_weapon_id: null,
              },
            })

          break
        case 'armor':
          const armor = await ctx.db.armorInInventory.findFirst({
            where: { id: input.id },
            include: { armor: true },
          })

          let wearableArmor
          switch (armor?.armor.type) {
            case ArmorType.HEAD:
              wearableArmor = { head_armor_id: armor.id }
              break
            case ArmorType.SHOULDER:
              wearableArmor = { shoulder_armor_id: armor.id }
              break
            case ArmorType.CHEST:
              wearableArmor = { chest_armor_id: armor.id }
              break
            case ArmorType.HAND:
              wearableArmor = { hand_armor_id: armor.id }
              break
            case ArmorType.PANTS:
              wearableArmor = { pants_armor_id: armor.id }
              break
            case ArmorType.BOOTS:
              wearableArmor = { boots_armor_id: armor.id }
              break
          }

          await ctx.db.wearable.update({
            where: { id: wearableId },
            data: { ...wearableArmor },
          })

          break
      }
    }),
  unwear: protectedProcedure
    .input(z.object({ type: z.enum(WEARABLES), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const wearable = await getWearable(ctx)

      if (!wearable) throw new Error('No wearable!')

      const wearableId = wearable.id

      switch (input.type) {
        case 'weapon':
          if (wearable.left_hand_weapon_id === input.id) {
            await ctx.db.wearable.update({
              where: { id: wearableId },
              data: { left_hand_weapon_id: null },
            })
          }
          if (wearable.right_hand_weapon_id === input.id) {
            await ctx.db.wearable.update({
              where: { id: wearableId },
              data: { right_hand_weapon_id: null },
            })
          }

          break
        case 'armor':
          const armor = await ctx.db.armorInInventory.findFirst({
            where: { id: input.id },
            include: { armor: true },
          })

          let wearableArmor
          switch (armor?.armor.type) {
            case ArmorType.HEAD:
              wearableArmor = { head_armor_id: null }
              break
            case ArmorType.SHOULDER:
              wearableArmor = { shoulder_armor_id: null }
              break
            case ArmorType.CHEST:
              wearableArmor = { chest_armor_id: null }
              break
            case ArmorType.HAND:
              wearableArmor = { hand_armor_id: null }
              break
            case ArmorType.PANTS:
              wearableArmor = { pants_armor_id: null }
              break
            case ArmorType.BOOTS:
              wearableArmor = { boots_armor_id: null }
              break
          }

          await ctx.db.wearable.update({
            where: { id: wearableId },
            data: { ...wearableArmor },
          })
          break
      }
    }),
  drink: protectedProcedure.input(z.object({ potionId: z.string() })).mutation(async ({ ctx, input }) => {
    const user = await getUser(ctx)
    const inventory = await getInventory(ctx)

    const potion = inventory.potions_inventory.find((x) => x.id === input.potionId)

    if (!potion) throw new Error('Potion does not exist!')

    await ctx.db.$transaction(async (db) => {
      await db.user.update({
        where: { id: user.id },
        data: {
          hp_actual: Math.min(user.hp_actual! + potion.potion.hp_gain, user.hp_max!),
        },
      })

      await db.potionInInventory.delete({
        where: { id: potion.id },
      })

      return { success: true }
    })
  }),
  move: protectedProcedure.input(z.enum(DIRECTIONS)).mutation(async ({ ctx, input }) => {
    const user = await getUser(ctx)

    const canMove =
      !Boolean(user.enemy_instance) &&
      !Boolean(user.loot) &&
      !Boolean(user.defeated)

    if (!canMove)
      return {
        pos_x: user.pos_x,
        pos_y: user.pos_y,
      }

    const horizontal = input === 'left' ? -1 : input === 'right' ? 1 : 0
    const vertical = input === 'down' ? -1 : input === 'up' ? 1 : 0

    await inspectPosition({
      ...ctx,
      session: {
        ...ctx.session,
        user: await ctx.db.user.update({
          where: { id: user.id },
          data: {
            pos_x: user.pos_x + horizontal,
            pos_y: user.pos_y + vertical,
          },
        }),
      },
    })
  }),
})

export async function getWearable(ctx: TRPCContext) {
  const user = await getUser(ctx)

  let wearable = await ctx.db.wearable.findFirst({
    where: { id: user.wearable_id ?? '-1' },
    include: {
      left_hand: { include: { weapon: true } },
      right_hand: { include: { weapon: true } },
      head: { include: { armor: true } },
      shoulder: { include: { armor: true } },
      chest: { include: { armor: true } },
      hand: { include: { armor: true } },
      pants: { include: { armor: true } },
      boots: { include: { armor: true } },
    },
  })

  if (!wearable) {
    wearable = await ctx.db.$transaction(async db => {
      const _wearable = await db.wearable.create({
        data: {},
        include: {
          left_hand: { include: { weapon: true } },
          right_hand: { include: { weapon: true } },
          head: { include: { armor: true } },
          shoulder: { include: { armor: true } },
          chest: { include: { armor: true } },
          hand: { include: { armor: true } },
          pants: { include: { armor: true } },
          boots: { include: { armor: true } },
        },
      })
  
      await db.user.update({
        where: { id: ctx.session!.user.id },
        data: {
          wearable: { connect: _wearable },
        },
      })

      return _wearable
    })
  }

  return wearable
}
