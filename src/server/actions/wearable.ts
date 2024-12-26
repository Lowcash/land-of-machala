'use server'

import { z } from 'zod'
import { db } from '@/server/db'
import { ArmorType, type Wearable } from '@prisma/client'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import * as PlayerAction from './player'
import * as InventoryAction from '@/server/actions/inventory'

import { ERROR_CAUSE, WEARABLES } from '@/const'

export const get = protectedAction.query(async () => {
  const player = await PlayerAction.get()

  const wearable = player.wearable_id
    ? await db.wearable.findFirst({
        where: { id: player.wearable_id },
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
    : await db.$transaction(async (db) => {
        const wearable = await db.wearable.create({
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
          where: { id: player.id },
          data: { wearable: { connect: { id: wearable.id } } },
        })

        return wearable
      })

  if (!wearable) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return wearable
})

export const wear = protectedAction
  .input(z.object({ type: z.enum(WEARABLES), inventoryWearableId: z.string() }))
  .mutation(async ({ input }) => {
    function makeWearableArmor(armorType: ArmorType): Partial<Wearable> {
      switch (armorType) {
        case ArmorType.HEAD:
          return { head_armor_id: input.inventoryWearableId }
        case ArmorType.SHOULDER:
          return { shoulder_armor_id: input.inventoryWearableId }
        case ArmorType.CHEST:
          return { chest_armor_id: input.inventoryWearableId }
        case ArmorType.HAND:
          return { hand_armor_id: input.inventoryWearableId }
        case ArmorType.PANTS:
          return { pants_armor_id: input.inventoryWearableId }
        case ArmorType.BOOTS:
          return { boots_armor_id: input.inventoryWearableId }
      }
    }

    if ((await PlayerAction.get()).isInCombat) throw getTRPCErrorFromUnknown(ERROR_CAUSE.COMBAT)

    const wearable = await get()

    if (input.type === 'armor') {
      const inventoryArmor = await db.armorInInventory.findFirst({
        where: { id: input.inventoryWearableId },
        include: { armor: true },
      })

      if (!inventoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

      await db.wearable.update({
        where: { id: wearable.id },
        data: { ...makeWearableArmor(inventoryArmor.armor.type) },
      })
    }
    if (input.type === 'left_weapon' || input.type === 'right_weapon') {
      const inventoryWeapon = await db.weaponInInventory.findFirst({
        where: { id: input.inventoryWearableId },
        include: { weapon: true },
      })

      if (!inventoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

      const wearableWeapons = await db.wearable.update({
        where: { id: wearable.id },
        data: {
          left_hand_weapon_id: input.type === 'left_weapon' ? input.inventoryWearableId : undefined,
          right_hand_weapon_id: input.type === 'right_weapon' ? input.inventoryWearableId : undefined,
        },
        select: { left_hand_weapon_id: true, right_hand_weapon_id: true },
      })

      if (wearableWeapons.left_hand_weapon_id === wearableWeapons.right_hand_weapon_id)
        await db.wearable.update({
          where: { id: wearable.id },
          data: {
            left_hand_weapon_id: input.type === 'right_weapon' ? null : undefined,
            right_hand_weapon_id: input.type === 'left_weapon' ? null : undefined,
          },
        })
    }
  })

export const unwear = protectedAction
  .input(z.object({ type: z.enum(WEARABLES), inventoryWearableId: z.string() }))
  .mutation(async ({ input }) => {
    function makeUnwearableArmor(armorType: ArmorType): Partial<Wearable> {
      switch (armorType) {
        case ArmorType.HEAD:
          return { head_armor_id: null }
        case ArmorType.SHOULDER:
          return { shoulder_armor_id: null }
        case ArmorType.CHEST:
          return { chest_armor_id: null }
        case ArmorType.HAND:
          return { hand_armor_id: null }
        case ArmorType.PANTS:
          return { pants_armor_id: null }
        case ArmorType.BOOTS:
          return { boots_armor_id: null }
      }
    }

    if ((await PlayerAction.get()).isInCombat) throw getTRPCErrorFromUnknown(ERROR_CAUSE.COMBAT)

    const wearable = await get()

    if (input.type === 'armor') {
      const inventoryArmor = await db.armorInInventory.findFirst({
        where: { id: input.inventoryWearableId },
        include: { armor: true },
      })

      if (!inventoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

      await db.wearable.update({
        where: { id: wearable.id },
        data: { ...makeUnwearableArmor(inventoryArmor.armor.type) },
      })
    }

    if (input.type === 'weapon') {
      const inventoryWeapon = await db.weaponInInventory.findFirst({
        where: { id: input.inventoryWearableId },
        include: { weapon: true },
      })

      if (!inventoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

      await db.wearable.update({
        where: { id: wearable.id },
        data: {
          left_hand_weapon_id: wearable.left_hand_weapon_id === wearable.id ? null : undefined,
          right_hand_weapon_id: wearable.right_hand_weapon_id === wearable.id ? null : undefined,
        },
      })
    }
  })

export const drink = protectedAction.input(z.object({ inventoryPotionId: z.string() })).mutation(async ({ input }) => {
  const inventory = await InventoryAction.get()

  const inventoryPotion = inventory.potions_inventory.find((x) => x.id === input.inventoryPotionId)

  if (!inventoryPotion) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  await db.$transaction(async (db) => {
    const player = await PlayerAction.get()

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
