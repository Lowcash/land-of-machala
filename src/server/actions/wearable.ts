'use server'

import { z } from 'zod'
import { db } from '../db'
import { cache } from 'react'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlayer, isPlayerInCombat } from './player'
import { getInventory } from './inventory'

import { ArmorType } from '@prisma/client'
import { ERROR_CAUSE, WEARABLES } from '@/const'

export const getWearable = cache(
  protectedAction.query(async () => {
    const player = await getPlayer()
    const playerWithWearable = await db.user.update({
      where: { id: player.id },
      data: {
        wearable: {
          connectOrCreate: {
            where: { id: player.wearable_id || undefined },
            create: {},
          },
        },
      },
      include: {
        wearable: {
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
        },
      },
    })

    if (!playerWithWearable.wearable) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    return playerWithWearable.wearable
  }),
)

export const wear = protectedAction
  .input(z.object({ type: z.enum(WEARABLES), inventoryWearableId: z.string() }))
  .mutation(async ({ input }) => {
    if (await isPlayerInCombat()) throw getTRPCErrorFromUnknown(ERROR_CAUSE.COMBAT)

    const wearable = await getWearable()

    switch (input.type) {
      case 'left_weapon': {
        const wearableWeapons = await db.wearable.update({
          where: { id: wearable.id },
          data: { left_hand_weapon_id: input.inventoryWearableId },
          select: { left_hand_weapon_id: true, right_hand_weapon_id: true },
        })

        if (wearableWeapons.left_hand_weapon_id === wearableWeapons.right_hand_weapon_id)
          await db.wearable.update({
            where: { id: wearable.id },
            data: {
              right_hand_weapon_id: null,
            },
          })
        break
      }
      case 'right_weapon': {
        const wearableWeapons = await db.wearable.update({
          where: { id: wearable.id },
          data: { right_hand_weapon_id: input.inventoryWearableId },
          select: { left_hand_weapon_id: true, right_hand_weapon_id: true },
        })

        if (wearableWeapons.left_hand_weapon_id === wearableWeapons.right_hand_weapon_id)
          await db.wearable.update({
            where: { id: wearable.id },
            data: {
              left_hand_weapon_id: null,
            },
          })
        break
      }
      case 'armor': {
        const inventoryArmor = await db.armorInInventory.findFirst({
          where: { id: input.inventoryWearableId },
          include: { armor: true },
        })

        if (!inventoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        let wearableArmor
        switch (inventoryArmor.armor.type) {
          case ArmorType.HEAD:
            wearableArmor = { head_armor_id: input.inventoryWearableId }
            break
          case ArmorType.SHOULDER:
            wearableArmor = { shoulder_armor_id: input.inventoryWearableId }
            break
          case ArmorType.CHEST:
            wearableArmor = { chest_armor_id: input.inventoryWearableId }
            break
          case ArmorType.HAND:
            wearableArmor = { hand_armor_id: input.inventoryWearableId }
            break
          case ArmorType.PANTS:
            wearableArmor = { pants_armor_id: input.inventoryWearableId }
            break
          case ArmorType.BOOTS:
            wearableArmor = { boots_armor_id: input.inventoryWearableId }
            break
        }

        await db.wearable.update({
          where: { id: wearable.id },
          data: { ...wearableArmor },
        })
        break
      }
    }
  })

export const unwear = protectedAction
  .input(z.object({ type: z.enum(WEARABLES), inventoryWearableId: z.string() }))
  .mutation(async ({ input }) => {
    if (await isPlayerInCombat()) throw getTRPCErrorFromUnknown(ERROR_CAUSE.COMBAT)

    const wearable = await getWearable()

    switch (input.type) {
      case 'weapon': {
        if (wearable.left_hand_weapon_id === input.inventoryWearableId)
          await db.wearable.update({
            where: { id: wearable.id },
            data: { left_hand_weapon_id: null },
          })
        if (wearable.right_hand_weapon_id === input.inventoryWearableId)
          await db.wearable.update({
            where: { id: wearable.id },
            data: { right_hand_weapon_id: null },
          })
        break
      }
      case 'armor': {
        const armor = await db.armorInInventory.findFirst({
          where: { id: input.inventoryWearableId },
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

        await db.wearable.update({
          where: { id: wearable.id },
          data: { ...wearableArmor },
        })
        break
      }
    }
  })

export const drink = protectedAction.input(z.object({ inventoryPotionId: z.string() })).mutation(async ({ input }) => {
  const player = await getPlayer()
  const inventory = await getInventory()

  const inventoryPotion = inventory.potions_inventory.find((x) => x.id === input.inventoryPotionId)

  if (!inventoryPotion) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  await db.$transaction(async (db) => {
    await db.user.update({
      where: { id: player.id },
      data: {
        hp_actual: Math.min(player.hp_actual! + inventoryPotion.potion.hp_gain, player.hp_max!),
      },
    })

    await db.potionInInventory.delete({
      where: { id: inventoryPotion.id },
    })
  })
})
