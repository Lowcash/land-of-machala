'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { ArmorType, type Wearable } from '@prisma/client'
import { authActionClient } from '@/lib/safe-action'
import { consumableActionSchema, wearableActionSchema } from '@/zod-schema/wearable'

import * as PlayerAction from './player'
import * as InventoryAction from './inventory'

import { ERROR_CAUSE } from '@/config'

export const show = authActionClient.metadata({ actionName: 'wearable_show' }).action(async () => {
  const wearable = await get().then((x) => x?.data)

  return {
    ...wearable,
    text: {
      weapon: i18n.t('weapon.header'),
      weapon_multi: i18n.t('weapon.header_multi'),
      left_hand: i18n.t('weapon.left_hand'),
      right_hand: i18n.t('weapon.right_hand'),
      armor: i18n.t('armor.header'),
      armor_multi: i18n.t('armor.header_multi'),
      head: i18n.t('armor.head'),
      shoulder: i18n.t('armor.shoulder'),
      chest: i18n.t('armor.chest'),
      hand: i18n.t('armor.hand'),
      pants: i18n.t('armor.pants'),
      boots: i18n.t('armor.boots'),
    },
  }
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

    if (player.hasCombat) throw new Error(ERROR_CAUSE.COMBAT)

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

    if (player.hasCombat) throw new Error(ERROR_CAUSE.COMBAT)

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
          hp_actual: Math.min(ctx.user.hp_actual! + (inventoryPotion.potion.hp_gain ?? 0), ctx.user.hp_max!),
        },
      })

      await db.potionInInventory.delete({
        where: { id: inventoryPotion.id },
      })
    })
  })

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

  return {
    ...wearable,
    left_hand: {
      ...wearable.left_hand,
      weapon: wearable.left_hand?.weapon
        ? {
            ...wearable.left_hand.weapon,
            name: i18n.t(`${wearable.left_hand.weapon.i18n_key}.header` as any),
          }
        : undefined,
    },
    right_hand: {
      ...wearable.right_hand,
      weapon: wearable.right_hand?.weapon
        ? {
            ...wearable.right_hand.weapon,
            name: i18n.t(`${wearable.right_hand.weapon.i18n_key}.header` as any),
          }
        : undefined,
    },
    head: {
      ...wearable.head,
      armor: wearable.head?.armor
        ? {
            ...wearable.head.armor,
            name: i18n.t(`${wearable.head.armor.i18n_key}.header` as any),
          }
        : undefined,
    },
    shoulder: {
      ...wearable.shoulder,
      armor: wearable.shoulder?.armor
        ? {
            ...wearable.shoulder.armor,
            name: i18n.t(`${wearable.shoulder.armor.i18n_key}.header` as any),
          }
        : undefined,
    },
    chest: {
      ...wearable.chest,
      armor: wearable.chest?.armor
        ? {
            ...wearable.chest.armor,
            name: i18n.t(`${wearable.chest.armor.i18n_key}.header` as any),
          }
        : undefined,
    },
    hand: {
      ...wearable.hand,
      armor: wearable.hand?.armor
        ? {
            ...wearable.hand.armor,
            name: i18n.t(`${wearable.hand.armor.i18n_key}.header` as any),
          }
        : undefined,
    },
    pants: {
      ...wearable.pants,
      armor: wearable.pants?.armor
        ? {
            ...wearable.pants?.armor,
            name: i18n.t(`${wearable.pants.armor.i18n_key}.header` as any),
          }
        : undefined,
    },
    boots: {
      ...wearable.boots,
      armor: wearable.boots?.armor
        ? {
            ...wearable.boots.armor,
            name: i18n.t(`${wearable.boots.armor.i18n_key}.header` as any),
          }
        : undefined,
    },
  }
})
