'use server'

import { getTranslations } from 'next-intl/server'
import { db } from '@/lib/db'
import { armoryItemActionSchema, armorySchema } from '@/zod-schema/armory'
import { playerProcedure } from '@/lib/safe-action'

import { get as getArmory } from '@/entity/armory'
import { get as getInventory } from '@/entity/inventory'
import { getAll as getAllArmor } from '@/entity/armor'
import { getAll as getAllWeapon } from '@/entity/weapon'

import { ERROR_CAUSE } from '@/config'

export const show = playerProcedure.createServerAction()
  .input(armorySchema)
  .handler(async ({ input, ctx }) => {
    const t = await getTranslations()

    const armory = await getArmory(input.armoryId, ctx.player.id, ctx.player.inventory_id)

    return {
      ...armory,
      text: {
        header: t('place.your_are_in', { place: armory.name }),
        description: armory.description,
        armorBuy: t('armor.buy'),
        armorSell: t('armor.sell'),
        weaponBuy: t('weapon.buy'),
        weaponSell: t('weapon.sell'),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        buySuccess: t(`${armory.i18n_key}.buy_success` as any),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        buyFailed: t(`${armory.i18n_key}.buy_failed` as any),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sellSuccess: t(`${armory.i18n_key}.sell_success` as any),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sellFailed: t(`${armory.i18n_key}.sell_failed` as any),
      },
    }
  })

export const buyItem = playerProcedure.createServerAction()
  .input(armoryItemActionSchema)
  .handler(async ({ input, ctx }) => {
    const [armory, inventory] = await Promise.all([
      getArmory(input.armoryId, ctx.player.id, ctx.player.inventory_id),
      getInventory(ctx.player.id, ctx.player.inventory_id),
    ])

    if (!armory || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    switch (input.armoryItemType) {
      case 'armor': {
        const armorsAll = await getAllArmor()

        if (!armorsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryArmor = armory.buyArmors?.find((x) => x.itemId === input.armoryItemId)

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
        const weaponsAll = await getAllWeapon()

        if (!weaponsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryBuyWeapon = armory.buyWeapons?.find((x) => x.itemId === input.armoryItemId)

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

export const sellItem = playerProcedure.createServerAction()
  .input(armoryItemActionSchema)
  .handler(async ({ input, ctx }) => {
    const [armory, inventory] = await Promise.all([
      getArmory(input.armoryId, ctx.player.id, ctx.player.inventory_id),
      getInventory(ctx.player.id, ctx.player.inventory_id),
    ])

    if (!armory || !inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    switch (input.armoryItemType) {
      case 'armor': {
        const armorsAll = await getAllArmor()

        if (!armorsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armoryArmor = armory.sellArmors?.find((x) => x.itemId === input.armoryItemId)

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
        const weaponsAll = await getAllWeapon()

        if (!weaponsAll) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

        const armorySellWeapon = armory.sellWeapons?.find((x) => x.itemId === input.armoryItemId)

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
