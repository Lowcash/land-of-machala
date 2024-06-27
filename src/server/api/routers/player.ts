import { z } from 'zod'
import { inspectPosition } from './game'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { ArmorType } from '@prisma/client'

import { DIRECTIONS, WEARABLE } from '@/types/location'

export const playerRouter = createTRPCRouter({
  info: protectedProcedure.query(({ ctx }) => ctx.session.user),
  inventory: protectedProcedure.query(({ ctx }) => ctx.session.user.inventory),
  wearable: protectedProcedure.query(async ({ ctx }) => {
    const leftHand =
      ctx.session.user.wearable.left_hand_weapon_id &&
      (
        await ctx.db.weaponInInventory.findFirst({
          where: { id: ctx.session.user.wearable.left_hand_weapon_id },
          include: { weapon: { select: { name: true } } },
        })
      ).weapon
    const rightHand =
      ctx.session.user.wearable.right_hand_weapon_id &&
      (
        await ctx.db.weaponInInventory.findFirst({
          where: { id: ctx.session.user.wearable.right_hand_weapon_id },
          include: { weapon: { select: { name: true } } },
        })
      ).weapon
    const head =
      ctx.session.user.wearable.head_armor_id &&
      (
        await ctx.db.armorInInventory.findFirst({
          where: { id: ctx.session.user.wearable.head_armor_id },
          include: { armor: { select: { name: true } } },
        })
      ).armor
    const shoulder =
      ctx.session.user.wearable.shoulder_armor_id &&
      (
        await ctx.db.armorInInventory.findFirst({
          where: { id: ctx.session.user.wearable.shoulder_armor_id },
          include: { armor: { select: { name: true } } },
        })
      ).armor
    const chest =
      ctx.session.user.wearable.chest_armor_id &&
      (
        await ctx.db.armorInInventory.findFirst({
          where: { id: ctx.session.user.wearable.chest_armor_id },
          include: { armor: { select: { name: true } } },
        })
      ).armor
    const hand =
      ctx.session.user.wearable.hand_armor_id &&
      (
        await ctx.db.armorInInventory.findFirst({
          where: { id: ctx.session.user.wearable.hand_armor_id },
          include: { armor: { select: { name: true } } },
        })
      ).armor
    const pants =
      ctx.session.user.wearable.pants_armor_id &&
      (
        await ctx.db.armorInInventory.findFirst({
          where: { id: ctx.session.user.wearable.pants_armor_id },
          include: { armor: { select: { name: true } } },
        })
      ).armor
    const boots =
      ctx.session.user.wearable.boots_armor_id &&
      (
        await ctx.db.armorInInventory.findFirst({
          where: { id: ctx.session.user.wearable.boots_armor_id },
          include: { armor: { select: { name: true } } },
        })
      ).armor

    return { leftHand, rightHand, head, shoulder, chest, hand, pants, boots }
  }),
  wear: protectedProcedure
    .input(z.object({ type: z.enum(WEARABLE), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let wearableId = ctx.session.user.wearable_id

      if (!Boolean(wearableId)) {
        const wearable = await ctx.db.wearable.create({ data: {} })

        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            wearable: { connect: wearable },
          },
        })

        wearableId = wearable.id
      }

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
