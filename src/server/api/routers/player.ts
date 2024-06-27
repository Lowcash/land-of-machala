import { z } from 'zod'
import { inspectPosition } from './game'
import { TRPCContext, createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { ArmorType } from '@prisma/client'

import { DIRECTIONS, WEARABLE } from '@/types/location'

export const playerRouter = createTRPCRouter({
  info: protectedProcedure.query(({ ctx }) => ctx.session.user),
  stats: protectedProcedure.query(async ({ ctx }) => {
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

    const intelligency =
      (wearable?.head?.armor?.intelligency ?? 0) +
      (wearable?.shoulder?.armor?.intelligency ?? 0) +
      (wearable?.chest?.armor?.intelligency ?? 0) +
      (wearable?.hand?.armor?.intelligency ?? 0) +
      (wearable?.pants?.armor?.intelligency ?? 0) +
      (wearable?.boots?.armor?.intelligency ?? 0)

    const damage_min =
      (wearable?.left_hand?.weapon?.damage_from ?? 0) + (wearable?.right_hand?.weapon?.damage_from ?? 0)
    const damage_max = (wearable?.left_hand?.weapon?.damage_to ?? 0) + (wearable?.right_hand?.weapon.damage_to ?? 0)

    return {
      level: ctx.session.user.level,
      damage_min,
      damage_max,
      strength,
      agility,
      intelligency,
    }
  }),
  inventory: protectedProcedure.query(({ ctx }) => ctx.session.user.inventory),
  wearable: protectedProcedure.query(async ({ ctx }) => {
    const wearable = await getWearable(ctx)

    console.log(wearable)

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
    .input(z.object({ type: z.enum(WEARABLE), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
          switch (armor.armor.type) {
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
  move: protectedProcedure.input(z.enum(DIRECTIONS)).mutation(async ({ ctx, input }) => {
    const canMove = !Boolean(ctx.session.user.enemy_instance) && !Boolean(ctx.session.user.loot)

    if (!canMove)
      return {
        pos_x: ctx.session.user.pos_x,
        pos_y: ctx.session.user.pos_y,
      }

    const horizontal = input === 'left' ? -1 : input === 'right' ? 1 : 0
    const vertical = input === 'down' ? -1 : input === 'up' ? 1 : 0

    const position = ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        pos_x: ctx.session.user.pos_x + horizontal,
        pos_y: ctx.session.user.pos_y + vertical,
      },
      select: {
        pos_x: true,
        pos_y: true,
      },
    })

    await inspectPosition(ctx)

    return position
  }),
})

async function getWearable(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('No user!')

  let wearable
  if (Boolean(ctx.session.user.wearable_id)) {
    wearable = await ctx.db.wearable.findFirst({
      where: { id: ctx.session.user.wearable_id },
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
  } else {
    wearable = await ctx.db.wearable.create({ data: {} })

    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        wearable: { connect: wearable },
      },
    })
  }

  return wearable
}
