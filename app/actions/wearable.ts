'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { ArmorType, type Wearable } from '@prisma/client'
import { playerActionClient } from '@/lib/safe-action'
import { consumableActionSchema, wearableActionSchema } from '@/zod-schema/wearable'

import * as InventoryEntity from '@/entity/inventory'
import * as PlayerEntity from '@/entity/player'
import * as StatsEntity from '@/entity/stats'
import * as WearableEntity from '@/entity/wearable'

import { ERROR_CAUSE } from '@/config'

export const show = playerActionClient.metadata({ actionName: 'wearable_show' }).action(async ({ ctx }) => {
  const wearable = await WearableEntity.get(ctx.player, ctx.player.wearable_id)

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

export const wear = playerActionClient
  .metadata({ actionName: 'wearable_wear' })
  .schema(wearableActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    function makeWearableArmor(armorType: ArmorType): Partial<Wearable> {
      switch (armorType) {
        case ArmorType.HEAD:
          return { head_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.SHOULDER:
          return { shoulder_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.CHEST:
          return { chest_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.HANDS:
          return { hands_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.PANTS:
          return { pants_armor_id: parsedInput.inventoryWearableId }
        case ArmorType.BOOTS:
          return { boots_armor_id: parsedInput.inventoryWearableId }
      }
    }

    let wearable = await WearableEntity.get(ctx.player, ctx.player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (PlayerEntity.hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.COMBAT)

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

    wearable = await WearableEntity.get(ctx.player, ctx.player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const stats = await StatsEntity.get(ctx.player, wearable)

    await db.user.update({
      where: { id: ctx.user.id },
      data: {
        strength: stats.strength,
        agility: stats.agility,
        intelligence: stats.intelligence,
        armor: stats.armor,
        damage_min: stats.damage.min,
        damage_max: stats.damage.max,
      },
    })
  })

export const unwear = playerActionClient
  .metadata({ actionName: 'wearable_unwear' })
  .schema(wearableActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    function makeUnwearableArmor(armorType: ArmorType): Partial<Wearable> {
      switch (armorType) {
        case ArmorType.HEAD:
          return { head_armor_id: null }
        case ArmorType.SHOULDER:
          return { shoulder_armor_id: null }
        case ArmorType.CHEST:
          return { chest_armor_id: null }
        case ArmorType.HANDS:
          return { hands_armor_id: null }
        case ArmorType.PANTS:
          return { pants_armor_id: null }
        case ArmorType.BOOTS:
          return { boots_armor_id: null }
      }
    }

    let wearable = await WearableEntity.get(ctx.player, ctx.player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (PlayerEntity.hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.COMBAT)

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

    wearable = await WearableEntity.get(ctx.player, ctx.player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const stats = await StatsEntity.get(ctx.player, wearable)

    await db.user.update({
      where: { id: ctx.user.id },
      data: {
        strength: stats.strength,
        agility: stats.agility,
        intelligence: stats.intelligence,
        armor: stats.armor,
        damage_min: stats.damage.min,
        damage_max: stats.damage.max,
      },
    })
  })

export const drink = playerActionClient
  .metadata({ actionName: 'wearable_drink' })
  .schema(consumableActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const inventory = await InventoryEntity.get(ctx.player.id, ctx.player.inventory_id)

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
