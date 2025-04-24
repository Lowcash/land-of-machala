'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { playerActionClient } from '@/lib/safe-action'
import { bankActionSchema, bankSchema } from '@/zod-schema/bank'

import * as BankEntity from '@/entity/bank'
import * as BankAccountEntity from '@/entity/bank-account'
import * as InventoryEntity from '@/entity/inventory'

import { ERROR_CAUSE } from '@/config'

export const show = playerActionClient
  .metadata({ actionName: 'bank_show' })
  .schema(bankSchema)
  .action(async ({ parsedInput }) => {
    const bank = await BankEntity.get(parsedInput.bankId)

    if (!bank) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...bank,
      text: {
        header: i18n.t('place.your_are_in', { place: bank.name }),
        description: bank.description,
        depositMoney: i18n.t('place.bank.deposit_money'),
        depositWeapon: i18n.t('place.bank.deposit_weapon'),
        depositArmor: i18n.t('place.bank.deposit_armor'),
        depositPotion: i18n.t('place.bank.deposit_potion'),
        withdrawMoney: i18n.t('place.bank.withdraw_money'),
        withdrawWeapon: i18n.t('place.bank.withdraw_weapon'),
        withdrawArmor: i18n.t('place.bank.withdraw_armor'),
        withdrawPotion: i18n.t('place.bank.withdraw_potion'),
        depositSuccess: i18n.t('place.bank.deposit_success'),
        withdrawSuccess: i18n.t('place.bank.withdraw_success'),
        depositOrWithdrawFailure: i18n.t('place.bank.deposit_or_withdraw_failure'),
        depositedMoney: i18n.t('place.bank.deposited_money'),
      },
    }
  })

export const showAccount = playerActionClient
  .metadata({ actionName: 'bank_show_account' })
  .schema(bankSchema)
  .action(async ({ parsedInput, ctx }) => BankAccountEntity.get(parsedInput.bankId, ctx.player.id))

export const depositItem = playerActionClient
  .metadata({ actionName: 'bank_deposit_item' })
  .schema(bankActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const bankAccount = await BankAccountEntity.get(parsedInput.bankId, ctx.player.id)

    if (!bankAccount) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (!!parsedInput.money) {
      const balance = ctx.user.money - parsedInput.money

      if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

      await db.$transaction(async (db) => {
        await db.bankAccount.update({
          where: { id: bankAccount.id },
          data: { money: bankAccount.money + parsedInput.money! },
        })

        await db.user.update({
          where: { id: ctx.user.id },
          data: { money: balance },
        })
      })
    }

    if (!!parsedInput.item) {
      const inventory = await InventoryEntity.get(ctx.player.id, ctx.player.inventory_id)

      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      switch (parsedInput.item.type) {
        case 'armor': {
          const inventoryItem = inventory.armors_inventory.find((x) => x.id === parsedInput.item!.id)

          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.$transaction(async (db) => {
            await db.bankAccount.update({
              where: { id: bankAccount.id },
              data: { armors: { create: [{ armor_id: inventoryItem.armor_id }] } },
            })

            await db.armorInInventory.delete({
              where: { id: inventoryItem.id },
            })
          })
          break
        }
        case 'weapon': {
          const inventoryItem = inventory.weapons_inventory.find((x) => x.id === parsedInput.item!.id)

          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.$transaction(async (db) => {
            await db.bankAccount.update({
              where: { id: bankAccount.id },
              data: { weapons: { create: [{ weapon_id: inventoryItem.weapon_id }] } },
            })

            await db.weaponInInventory.delete({
              where: { id: inventoryItem.id },
            })
          })

          break
        }
        case 'potion': {
          const inventoryItem = inventory.potions_inventory.find((x) => x.id === parsedInput.item!.id)

          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.$transaction(async (db) => {
            await db.bankAccount.update({
              where: { id: bankAccount.id },
              data: { potions: { create: [{ potion_id: inventoryItem.potion_id }] } },
            })

            await db.potionInInventory.delete({
              where: { id: inventoryItem.id },
            })
          })

          break
        }
      }
    }
  })

export const withdrawItem = playerActionClient
  .metadata({ actionName: 'bank_withdraw_item' })
  .schema(bankActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const bankAccount = await BankAccountEntity.get(parsedInput.bankId, ctx.player.id)

    if (!bankAccount) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (!!parsedInput.money) {
      const balance = bankAccount.money - parsedInput.money

      if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)

      await db.$transaction(async (db) => {
        await db.user.update({
          where: { id: ctx.user.id },
          data: { money: ctx.user.money + parsedInput.money! },
        })

        await db.bankAccount.update({
          where: { id: bankAccount.id },
          data: { money: balance },
        })
      })
    }

    if (!!parsedInput.item) {
      const inventory = await InventoryEntity.get(ctx.player.id, ctx.player.inventory_id)

      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      switch (parsedInput.item.type) {
        case 'armor': {
          const bankItem = bankAccount.armors.find((x) => x.id === parsedInput.item!.id)

          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.$transaction(async (db) => {
            await db.inventory.update({
              where: { id: inventory.id },
              data: { armors_inventory: { create: [{ armor_id: bankItem.armor_id }] } },
            })

            await db.armorInBank.delete({
              where: { id: bankItem.id },
            })
          })

          break
        }
        case 'weapon': {
          const bankItem = bankAccount.weapons.find((x) => x.id === parsedInput.item!.id)

          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.$transaction(async (db) => {
            await db.inventory.update({
              where: { id: inventory.id },
              data: { weapons_inventory: { create: [{ weapon_id: bankItem.weapon_id }] } },
            })

            await db.weaponInBank.delete({
              where: { id: bankItem.id },
            })
          })

          break
        }
        case 'potion': {
          const bankItem = bankAccount.potions.find((x) => x.id === parsedInput.item!.id)

          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

          await db.$transaction(async (db) => {
            await db.inventory.update({
              where: { id: inventory.id },
              data: { potions_inventory: { create: [{ potion_id: bankItem.potion_id }] } },
            })

            await db.potionInBank.delete({
              where: { id: bankItem.id },
            })
          })

          break
        }
      }
    }
  })
