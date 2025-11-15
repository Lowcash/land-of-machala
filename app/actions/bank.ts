'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { playerActionClient } from '@/lib/safe-action'
import { bankActionSchema, bankSchema } from '@/zod-schema/bank'

import * as BankEntity from '@/entity/bank'
import * as BankAccountEntity from '@/entity/bank-account'
import * as InventoryEntity from '@/entity/inventory'

import { ERROR_CAUSE } from '@/config'

// Helper: Deposit money transaction
async function depositMoney(bankAccountId: string, userId: string, amount: number, userBalance: number) {
  await db.$transaction(async (db) => {
    await db.bankAccount.update({
      where: { id: bankAccountId },
      data: { money: { increment: amount } },
    })
    await db.user.update({
      where: { id: userId },
      data: { money: userBalance - amount },
    })
  })
}

// Helper: Withdraw money transaction
async function withdrawMoney(bankAccountId: string, userId: string, amount: number, userBalance: number) {
  await db.$transaction(async (db) => {
    await db.user.update({
      where: { id: userId },
      data: { money: userBalance + amount },
    })
    await db.bankAccount.update({
      where: { id: bankAccountId },
      data: { money: { decrement: amount } },
    })
  })
}

// Helper: Deposit item transaction (armor/weapon/potion)
async function depositItemTransaction(
  bankAccountId: string,
  itemType: 'armor' | 'weapon' | 'potion',
  itemId: string,
  relationId: string,
) {
  const tableMap = {
    armor: { bank: 'armors', inventory: 'armorInInventory', field: 'armor_id' },
    weapon: { bank: 'weapons', inventory: 'weaponInInventory', field: 'weapon_id' },
    potion: { bank: 'potions', inventory: 'potionInInventory', field: 'potion_id' },
  } as const

  const config = tableMap[itemType]

  await db.$transaction(async (db) => {
    await db.bankAccount.update({
      where: { id: bankAccountId },
      data: { [config.bank]: { create: [{ [config.field]: relationId }] } },
    })
    // @ts-expect-error - Dynamic Prisma table access
    await db[config.inventory].delete({ where: { id: itemId } })
  })
}

// Helper: Withdraw item transaction (armor/weapon/potion)
async function withdrawItemTransaction(
  inventoryId: string,
  itemType: 'armor' | 'weapon' | 'potion',
  itemId: string,
  relationId: string,
) {
  const tableMap = {
    armor: { inventory: 'armors_inventory', bank: 'armorInBank', field: 'armor_id' },
    weapon: { inventory: 'weapons_inventory', bank: 'weaponInBank', field: 'weapon_id' },
    potion: { inventory: 'potions_inventory', bank: 'potionInBank', field: 'potion_id' },
  } as const

  const config = tableMap[itemType]

  await db.$transaction(async (db) => {
    await db.inventory.update({
      where: { id: inventoryId },
      data: { [config.inventory]: { create: [{ [config.field]: relationId }] } },
    })
    // @ts-expect-error - Dynamic Prisma table access
    await db[config.bank].delete({ where: { id: itemId } })
  })
}

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

    if (parsedInput.money) {
      const balance = ctx.user.money - parsedInput.money
      if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)
      await depositMoney(bankAccount.id, ctx.user.id, parsedInput.money, ctx.user.money)
    }

    if (parsedInput.item) {
      const inventory = await InventoryEntity.get(ctx.player.id, ctx.player.inventory_id)
      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      const itemType = parsedInput.item.type
      // Bank only supports 'weapon', 'armor', 'potion' (not 'left_weapon' or 'right_weapon')
      if (itemType === 'left_weapon' || itemType === 'right_weapon') {
        throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
      }

      switch (itemType) {
        case 'armor': {
          const inventoryItem = inventory.armors_inventory.find((x) => x.id === parsedInput.item!.id)
          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await depositItemTransaction(bankAccount.id, 'armor', inventoryItem.id, inventoryItem.armor_id)
          break
        }
        case 'weapon': {
          const inventoryItem = inventory.weapons_inventory.find((x) => x.id === parsedInput.item!.id)
          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await depositItemTransaction(bankAccount.id, 'weapon', inventoryItem.id, inventoryItem.weapon_id)
          break
        }
        case 'potion': {
          const inventoryItem = inventory.potions_inventory.find((x) => x.id === parsedInput.item!.id)
          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await depositItemTransaction(bankAccount.id, 'potion', inventoryItem.id, inventoryItem.potion_id)
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

    if (parsedInput.money) {
      const balance = bankAccount.money - parsedInput.money
      if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)
      await withdrawMoney(bankAccount.id, ctx.user.id, parsedInput.money, ctx.user.money)
    }

    if (parsedInput.item) {
      const inventory = await InventoryEntity.get(ctx.player.id, ctx.player.inventory_id)
      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      const itemType = parsedInput.item.type
      // Bank only supports 'weapon', 'armor', 'potion' (not 'left_weapon' or 'right_weapon')
      if (itemType === 'left_weapon' || itemType === 'right_weapon') {
        throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
      }

      switch (itemType) {
        case 'armor': {
          const bankItem = bankAccount.armors.find((x) => x.id === parsedInput.item!.id)
          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await withdrawItemTransaction(inventory.id, 'armor', bankItem.id, bankItem.armor_id)
          break
        }
        case 'weapon': {
          const bankItem = bankAccount.weapons.find((x) => x.id === parsedInput.item!.id)
          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await withdrawItemTransaction(inventory.id, 'weapon', bankItem.id, bankItem.weapon_id)
          break
        }
        case 'potion': {
          const bankItem = bankAccount.potions.find((x) => x.id === parsedInput.item!.id)
          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await withdrawItemTransaction(inventory.id, 'potion', bankItem.id, bankItem.potion_id)
          break
        }
      }
    }
  })
