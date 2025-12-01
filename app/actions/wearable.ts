'use server'

import { z } from 'zod'
import { getTranslations } from 'next-intl/server'
import { db } from '@/lib/db'
import { ArmorType, type Wearable } from '@prisma/client'
import { playerProcedure } from '@/lib/safe-action'
import { consumableActionSchema, wearableActionSchema } from '@/zod-schema/wearable'

import { get as getPlayer, hasCombat } from '@/entity/player'
import { get as getWearable } from '@/entity/wearable'
import { get as getStats } from '@/entity/stats'
import { get as getInventory } from '@/entity/inventory'

import { ERROR_CAUSE } from '@/config'

// Helper: Update player stats after equipment change
async function updatePlayerStats(userId: string, playerId: string, wearableId: string | null) {
  if (!wearableId) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const player = await getPlayer(playerId)
  if (!player) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const wearable = await getWearable(player, wearableId)
  if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const stats = await getStats(player, wearable)

  await db.user.update({
    where: { id: userId },
    data: {
      strength: stats.strength,
      agility: stats.agility,
      intelligence: stats.intelligence,
      armor: stats.armor,
      damage_min: stats.damage.min,
      damage_max: stats.damage.max,
    },
  })
}

export const show = playerProcedure.createServerAction()
  .input(z.object({}).optional())
  .handler(async ({ ctx }) => {
    const t = await getTranslations()

    const wearable = await getWearable(ctx.player, ctx.player.wearable_id)

    return {
      ...wearable,
      text: {
        weapon: t('weapon.header'),
        weapon_multi: t('weapon.header_multi'),
        left_hand: t('weapon.left_hand'),
        right_hand: t('weapon.right_hand'),
        armor: t('armor.header'),
        armor_multi: t('armor.header_multi'),
        head: t('armor.head'),
        shoulder: t('armor.shoulder'),
        chest: t('armor.chest'),
        hand: t('armor.hand'),
        pants: t('armor.pants'),
        boots: t('armor.boots'),
      },
    }
  })

export const wear = playerProcedure.createServerAction()
  .input(wearableActionSchema)
  .handler(async ({ input, ctx }) => {
    function makeWearableArmor(armorType: ArmorType): Partial<Wearable> {
      switch (armorType) {
        case ArmorType.HEAD:
          return { head_armor_id: input.inventoryWearableId }
        case ArmorType.SHOULDER:
          return { shoulder_armor_id: input.inventoryWearableId }
        case ArmorType.CHEST:
          return { chest_armor_id: input.inventoryWearableId }
        case ArmorType.HANDS:
          return { hands_armor_id: input.inventoryWearableId }
        case ArmorType.PANTS:
          return { pants_armor_id: input.inventoryWearableId }
        case ArmorType.BOOTS:
          return { boots_armor_id: input.inventoryWearableId }
      }
    }

    const wearable = await getWearable(ctx.player, ctx.player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.COMBAT)

    if (input.type === 'armor') {
      const inventoryArmor = await db.armorInInventory.findFirst({
        where: { id: input.inventoryWearableId },
        include: { armor: true },
      })

      if (!inventoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

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

      if (!inventoryWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

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

    await updatePlayerStats(ctx.user.id, ctx.player.id, ctx.player.wearable_id)
  })

export const unwear = playerProcedure.createServerAction()
  .input(wearableActionSchema)
  .handler(async ({ input, ctx }) => {
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

    const wearable = await getWearable(ctx.player, ctx.player.wearable_id)

    if (!wearable) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (hasCombat(ctx.player)) throw new Error(ERROR_CAUSE.COMBAT)

    if (input.type === 'armor') {
      const inventoryArmor = await db.armorInInventory.findFirst({
        where: { id: input.inventoryWearableId },
        include: { armor: true },
      })

      if (!inventoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

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

      if (!inventoryWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      await db.wearable.update({
        where: { id: wearable.id },
        data: {
          left_hand_weapon_id: wearable.left_hand_weapon_id === inventoryWeapon.id ? null : undefined,
          right_hand_weapon_id: wearable.right_hand_weapon_id === inventoryWeapon.id ? null : undefined,
        },
      })
    }

    await updatePlayerStats(ctx.user.id, ctx.player.id, ctx.player.wearable_id)
  })

export const drink = playerProcedure.createServerAction()
  .input(consumableActionSchema)
  .handler(async ({ input, ctx }) => {
    const inventory = await getInventory(ctx.player.id, ctx.player.inventory_id)

    if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    const inventoryPotion = inventory.potions_inventory.find((x) => x.id === input.inventoryConsumableId)

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
