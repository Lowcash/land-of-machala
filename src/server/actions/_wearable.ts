import { db } from '@/server/db'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { ArmorType, type Wearable } from '@prisma/client'
import * as WearableAction from '@/server/actions/wearable'
import * as PlayerAction from '@/server/actions/player'
import * as InventoryAction from '@/server/actions/inventory'

import { ERROR_CAUSE, WEARABLES } from '@/const'

export async function get(playerId: string, wearableId: string | null) {
  const wearable = wearableId
    ? await db.wearable.findFirst({
        where: { id: wearableId },
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
          where: { id: playerId },
          data: { wearable: { connect: { id: wearable.id } } },
        })

        return wearable
      })

  if (!wearable) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return wearable
}

type WearableType = (typeof WEARABLES)[number]

export async function wear(inventoryWearableId: string, wearable: { id: string; type: WearableType }) {
  function makeWearableArmor(armorType: ArmorType): Partial<Wearable> {
    switch (armorType) {
      case ArmorType.HEAD:
        return { head_armor_id: inventoryWearableId }
      case ArmorType.SHOULDER:
        return { shoulder_armor_id: inventoryWearableId }
      case ArmorType.CHEST:
        return { chest_armor_id: inventoryWearableId }
      case ArmorType.HAND:
        return { hand_armor_id: inventoryWearableId }
      case ArmorType.PANTS:
        return { pants_armor_id: inventoryWearableId }
      case ArmorType.BOOTS:
        return { boots_armor_id: inventoryWearableId }
    }
  }

  if (wearable.type === 'armor') {
    const inventoryArmor = await db.armorInInventory.findFirst({
      where: { id: inventoryWearableId },
      include: { armor: true },
    })

    if (!inventoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    await db.wearable.update({
      where: { id: wearable.id },
      data: { ...makeWearableArmor(inventoryArmor.armor.type) },
    })
  }
  if (wearable.type === 'left_weapon' || wearable.type === 'right_weapon') {
    const inventoryWeapon = await db.weaponInInventory.findFirst({
      where: { id: inventoryWearableId },
      include: { weapon: true },
    })

    if (!inventoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    const wearableWeapons = await db.wearable.update({
      where: { id: wearable.id },
      data: {
        left_hand_weapon_id: wearable.type === 'left_weapon' ? inventoryWearableId : undefined,
        right_hand_weapon_id: wearable.type === 'right_weapon' ? inventoryWearableId : undefined,
      },
      select: { left_hand_weapon_id: true, right_hand_weapon_id: true },
    })

    if (wearableWeapons.left_hand_weapon_id === wearableWeapons.right_hand_weapon_id)
      await db.wearable.update({
        where: { id: wearable.id },
        data: {
          left_hand_weapon_id: wearable.type === 'right_weapon' ? null : undefined,
          right_hand_weapon_id: wearable.type === 'left_weapon' ? null : undefined,
        },
      })
  }
}

export async function unwear(inventoryWearableId: string, wearable: { id: string; type: WearableType }) {
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

  if (wearable.type === 'armor') {
    const inventoryArmor = await db.armorInInventory.findFirst({
      where: { id: inventoryWearableId },
      include: { armor: true },
    })

    if (!inventoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    await db.wearable.update({
      where: { id: wearable.id },
      data: { ...makeUnwearableArmor(inventoryArmor.armor.type) },
    })
  }
  if (wearable.type === 'weapon') {
    const inventoryWeapon = await db.weaponInInventory.findFirst({
      where: { id: inventoryWearableId },
      include: { weapon: true },
    })

    if (!inventoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    const _wearable = await WearableAction.get()

    await db.wearable.update({
      where: { id: wearable.id },
      data: {
        left_hand_weapon_id: _wearable.left_hand_weapon_id === wearable.id ? null : undefined,
        right_hand_weapon_id: _wearable.right_hand_weapon_id === wearable.id ? null : undefined,
      },
    })
  }
}

export async function drink(inventoryPotionId: string) {
  const inventory = await InventoryAction.get()

  const inventoryPotion = inventory.potions_inventory.find((x) => x.id === inventoryPotionId)

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
}
