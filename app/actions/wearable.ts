'use server'

import { db } from '@/lib/db'
import { ArmorType, type Wearable } from '@prisma/client'
import { authActionClient } from '@/lib/safe-action'
import { consumableActionSchema, wearableActionSchema } from '@/zod-schema/wearable'

import * as PlayerAction from './player'
import * as InventoryAction from './inventory'

import { ERROR_CAUSE } from '@/config'

export const get = authActionClient.metadata({ actionName: 'wearable_get' }).action(async ({ ctx }) => {
  const wearable = ctx.user.wearable_id
    ? await db.wearable.findFirst({
        where: { id: ctx.user.wearable_id },
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
          where: { id: ctx.user.id },
          data: { wearable: { connect: { id: wearable.id } } },
        })

        return wearable
      })

  if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  return wearable
})

export const wear = authActionClient
  .metadata({ actionName: 'wearable_wear' })
  .schema(wearableActionSchema)
  .action(async ({ parsedInput }) => {
    function makeWearableArmor(armorType: ArmorType): Partial<Wearable> {
      switch (armorType) {
        case ArmorType.HEAD:
          return { head_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.SHOULDER:
          return { shoulder_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.CHEST:
          return { chest_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.HAND:
          return { hand_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.PANTS:
          return { pants_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.BOOTS:
          return { boots_armor_id: parsedInput.inventoryWearableId }
      }
    }

    const [player, wearable] = await Promise.all([PlayerAction.get().then((x) => x?.data), get().then((x) => x?.data)])

    if (!player || !wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (player.isInCombat) throw new Error(ERROR_CAUSE.COMBAT)

    if (parsedInput.type === 'armor') {
      const inventoryArmor = await db.armorInInventory.findFirst({
        where: { id: parsedInput.inventoryWearableId },
        include: { armor: true },
      })

      if (!inventoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      await db.wearable.update({
        where: { id: wearable.id },
        data: { ...makeWearableArmor(inventoryArmor.armor.type) },
      })
    }
    if (parsedInput.type === 'left_weapon' || parsedInput.type === 'right_weapon') {
      const inventoryWeapon = await db.weaponInInventory.findFirst({
        where: { id: parsedInput.inventoryWearableId },
        include: { weapon: true },
      })

      if (!inventoryWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      const wearableWeapons = await db.wearable.update({
        where: { id: wearable.id },
        data: {
          left_hand_weapon_id: parsedInput.type === 'left_weapon' ? parsedInput.inventoryWearableId : undefined,
          right_hand_weapon_id: parsedInput.type === 'right_weapon' ? parsedInput.inventoryWearableId : undefined,
        },
        select: { left_hand_weapon_id: true, right_hand_weapon_id: true },
      })

      if (wearableWeapons.left_hand_weapon_id === wearableWeapons.right_hand_weapon_id)
        await db.wearable.update({
          where: { id: wearable.id },
          data: {
            left_hand_weapon_id: parsedInput.type === 'right_weapon' ? null : undefined,
            right_hand_weapon_id: parsedInput.type === 'left_weapon' ? null : undefined,
          },
        })
    }
  })

export const unwear = authActionClient
  .metadata({ actionName: 'wearable_unwear' })
  .schema(wearableActionSchema)
  .action(async ({ parsedInput }) => {
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

    const [player, wearable] = await Promise.all([PlayerAction.get().then((x) => x?.data), get().then((x) => x?.data)])

    if (!player || !wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (player.isInCombat) throw new Error(ERROR_CAUSE.COMBAT)

    if (parsedInput.type === 'armor') {
      const inventoryArmor = await db.armorInInventory.findFirst({
        where: { id: parsedInput.inventoryWearableId },
        include: { armor: true },
      })

      if (!inventoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      await db.wearable.update({
        where: { id: wearable.id },
        data: { ...makeUnwearableArmor(inventoryArmor.armor.type) },
      })
    }

    if (parsedInput.type === 'weapon') {
      const inventoryWeapon = await db.weaponInInventory.findFirst({
        where: { id: parsedInput.inventoryWearableId },
        include: { weapon: true },
      })

      if (!inventoryWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      await db.wearable.update({
        where: { id: wearable.id },
        data: {
          left_hand_weapon_id: wearable.left_hand_weapon_id === inventoryWeapon.id ? null : undefined,
          right_hand_weapon_id: wearable.right_hand_weapon_id === inventoryWeapon.id ? null : undefined,
        },
      })
    }
  })

export const drink = authActionClient
  .metadata({ actionName: 'wearable_drink' })
  .schema(consumableActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const inventory = (await InventoryAction.get())?.data

    if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const inventoryPotion = inventory.potions_inventory.find((x) => x.id === parsedInput.inventoryConsumableId)

    if (!inventoryPotion) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await db.$transaction(async (db) => {
      await db.user.update({
        where: { id: ctx.user.id },
        data: {
          hp_actual: Math.min(ctx.user.hp_actual! + inventoryPotion.potion.hp_gain, ctx.user.hp_max!),
        },
      })

      await db.potionInInventory.delete({
        where: { id: inventoryPotion.id },
      })
    })
  })
