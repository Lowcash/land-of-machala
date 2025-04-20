'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'
import { bankActionSchema, bankSchema } from '@/zod-schema/bank'

import * as InventoryAction from './inventory'

import { ERROR_CAUSE } from '@/config'

export const show = authActionClient
  .metadata({ actionName: 'bank_show' })
  .schema(bankSchema)
  .action(async ({ parsedInput }) => {
    const bank = await get({ bankId: parsedInput.bankId }).then((x) => x?.data)

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

export const get = authActionClient
  .metadata({ actionName: 'bank_get' })
  .schema(bankSchema)
  .action(async ({ parsedInput }) => {
    const bank = await db.bank.findFirst({
      where: { id: parsedInput.bankId },
    })

    if (!bank) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...bank,
      name: i18n.t(`${bank?.i18n_key}.header` as any),
      description: i18n.t(`${bank?.i18n_key}.description` as any),
    }
  })

export const showAccount = authActionClient
  .metadata({ actionName: 'bank_showAccount' })
  .schema(bankSchema)
  .action(async ({ parsedInput, ctx }) => {
    let bankAccount = await db.bankAccount.findFirst({
      where: { bank_id: parsedInput.bankId, user_id: ctx.user.id },
      include: {
        weapons: { include: { weapon: true } },
        armors: { include: { armor: true } },
        potions: { include: { potion: true } },
      },
    })

    if (!bankAccount) {
      bankAccount = await db.$transaction(async (db) => {
        const bankAccount = await db.bankAccount.create({
          data: { bank_id: parsedInput.bankId, user_id: ctx.user.id },
          include: {
            weapons: { include: { weapon: true } },
            armors: { include: { armor: true } },
            potions: { include: { potion: true } },
          },
        })

        await db.bank.update({
          where: { id: parsedInput.bankId },
          data: {
            accounts: { connect: { id: bankAccount.id } },
          },
        })

        return bankAccount
      })
    }

    if (!bankAccount) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...bankAccount,
      weapons: bankAccount.weapons.map((x) => ({
        ...x,
        weapon: { ...x.weapon, name: i18n.t(`${x.weapon.i18n_key}.header` as any) },
      })),
      armors: bankAccount.armors.map((x) => ({
        ...x,
        armor: { ...x.armor, name: i18n.t(`${x.armor.i18n_key}.header` as any) },
      })),
      potions: bankAccount.potions.map((x) => ({
        ...x,
        potion: { ...x.potion, name: i18n.t(`${x.potion.i18n_key}.header` as any) },
      })),
    }
  })

export const depositItem = authActionClient
  .metadata({ actionName: 'bank_depositItem' })
  .schema(bankActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const bankAccount = (await showAccount({ bankId: parsedInput.bankId }))?.data

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
      const inventory = (await InventoryAction.get())?.data

      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      switch (parsedInput.item.type) {
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

export const withdrawItem = authActionClient
  .metadata({ actionName: 'bank_withdrawItem' })
  .schema(bankActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const bankAccount = (await showAccount({ bankId: parsedInput.bankId }))?.data

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
      const inventory = (await InventoryAction.get())?.data!

      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      switch (parsedInput.item.type) {
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
