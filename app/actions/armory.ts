'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { playerActionClient, handleValidationErrorsShape } from '@/lib/safe-action'
import { armoryItemActionSchema, armorySchema } from '@/zod-schema/armory'

import * as ArmorEntity from '@/entity/armor'
import * as WeaponEntity from '@/entity/weapon'
import * as ArmoryEntity from '@/entity/armory'
import * as InventoryEntity from '@/entity/inventory'

import { ERROR_CAUSE } from '@/config'

export const show = playerActionClient
  .metadata({ actionName: 'armory_show' })
  .schema(armorySchema, { handleValidationErrorsShape })
  .action(async ({ parsedInput, ctx }) => {
    const armory = await ArmoryEntity.get(parsedInput.armoryId, ctx.player.id, ctx.player.inventory_id)

    return {
      ...armory,
      text: {
        header: i18n.t('place.your_are_in', { place: armory.name }),
        description: armory.description,
        armorBuy: i18n.t('armor.buy'),
        armorSell: i18n.t('armor.sell'),
        weaponBuy: i18n.t('weapon.buy'),
        weaponSell: i18n.t('weapon.sell'),
        buySuccess: i18n.t(`${armory.i18n_key}.buy_success` as any),
        buyFailed: i18n.t(`${armory.i18n_key}.buy_failed` as any),
      },
    }
  })

export const buyItem = playerActionClient
  .metadata({ actionName: 'armory_buy_item' })
  .schema(armoryItemActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [armory, inventory] = await Promise.all([
      ArmoryEntity.get(parsedInput.armoryId, ctx.player.id, ctx.player.inventory_id),
      InventoryEntity.get(ctx.player.id, ctx.player.inventory_id),
    ])

    if (!armory || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    switch (parsedInput.armoryItemType) {
      case 'armor': {
        const armorsAll = await ArmorEntity.getAll()

        if (!armorsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryArmor = armory.buyArmors?.find((x) => x.itemId === parsedInput.armoryItemId)

        if (!armoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money - (armoryArmor?.price ?? 0)

        if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })

          await db.armorInInventory.create({
            data: {
              armor_id: armoryArmor.armor_id,
              inventory_id: inventory.id,
            },
          })
        })

        break
      }
      case 'weapon': {
        const weaponsAll = await WeaponEntity.getAll()

        if (!weaponsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryBuyWeapon = armory.buyWeapons?.find((x) => x.itemId === parsedInput.armoryItemId)

        if (!armoryBuyWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money - (armoryBuyWeapon?.price ?? 0)

        if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })

          await db.weaponInInventory.create({
            data: {
              weapon_id: armoryBuyWeapon.weapon_id,
              inventory_id: inventory.id,
            },
          })
        })

        break
      }
    }
  })

export const sellItem = playerActionClient
  .metadata({ actionName: 'armory_sell_item' })
  .schema(armoryItemActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [armory, inventory] = await Promise.all([
      ArmoryEntity.get(parsedInput.armoryId, ctx.player.id, ctx.player.inventory_id),
      InventoryEntity.get(ctx.player.id, ctx.player.inventory_id),
    ])

    if (!armory || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    switch (parsedInput.armoryItemType) {
      case 'armor': {
        const armorsAll = await ArmorEntity.getAll()

        if (!armorsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryArmor = armory.sellArmors?.find((x) => x.itemId === parsedInput.armoryItemId)

        if (!armoryArmor) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money + (armoryArmor?.price ?? 0)

        await db.$transaction(async (db) => {
          const armorToDelete = await db.armorInInventory.findFirst({
            where: {
              inventory_id: inventory.id,
              armor_id: armoryArmor.armor_id,
            },
          })

          if (!armorToDelete) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.armorInInventory.delete({
            where: {
              id: armorToDelete.id,
            },
          })

          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })
        })

        break
      }
      case 'weapon': {
        const weaponsAll = await WeaponEntity.getAll()

        if (!weaponsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armorySellWeapon = armory.sellWeapons?.find((x) => x.itemId === parsedInput.armoryItemId)

        if (!armorySellWeapon) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = ctx.user.money + (armorySellWeapon?.price ?? 0)

        await db.$transaction(async (db) => {
          const weaponToDelete = await db.weaponInInventory.findFirst({
            where: {
              inventory_id: inventory.id,
              weapon_id: armorySellWeapon.weapon_id,
            },
          })

          if (!weaponToDelete) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.weaponInInventory.delete({
            where: {
              id: weaponToDelete.id,
            },
          })

          await db.user.update({
            where: { id: ctx.user.id },
            data: { money: balance },
          })
        })

        break
      }
    }
  })
