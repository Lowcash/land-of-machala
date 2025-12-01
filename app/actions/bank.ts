'use server'

import { getTranslations } from 'next-intl/server'
import { db } from '@/lib/db'
import { bankActionSchema, bankSchema } from '@/zod-schema/bank'
import { playerProcedure } from '@/lib/safe-action'

import { get as getBank } from '@/entity/bank'
import { get as getBankAccount } from '@/entity/bank-account'
import { get as getInventory } from '@/entity/inventory'

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

export const show = playerProcedure
  .createServerAction()
  .input(bankSchema)
  .handler(async ({ input }) => {
    const t = await getTranslations()

    const bank = await getBank(input.bankId)

    if (!bank) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    return {
      ...bank,
      text: {
        header: t('place.your_are_in', { place: bank.name }),
        description: bank.description,
        depositMoney: t('place.bank.deposit_money'),
        depositWeapon: t('place.bank.deposit_weapon'),
        depositArmor: t('place.bank.deposit_armor'),
        depositPotion: t('place.bank.deposit_potion'),
        withdrawMoney: t('place.bank.withdraw_money'),
        withdrawWeapon: t('place.bank.withdraw_weapon'),
        withdrawArmor: t('place.bank.withdraw_armor'),
        withdrawPotion: t('place.bank.withdraw_potion'),
        depositSuccess: t('place.bank.deposit_success'),
        withdrawSuccess: t('place.bank.withdraw_success'),
        depositOrWithdrawFailure: t('place.bank.deposit_or_withdraw_failure'),
        depositedMoney: t('place.bank.deposited_money'),
      },
    }
  })

export const showAccount = playerProcedure
  .createServerAction()
  .input(bankSchema)
  .handler(async ({ input, ctx }) => getBankAccount(input.bankId, ctx.player.id))

export const depositItem = playerProcedure
  .createServerAction()
  .input(bankActionSchema)
  .handler(async ({ input, ctx }) => {
    const bankAccount = await getBankAccount(input.bankId, ctx.player.id)
    if (!bankAccount) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (input.money) {
      const balance = ctx.user.money - input.money
      if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)
      await depositMoney(bankAccount.id, ctx.user.id, input.money, ctx.user.money)
    }

    if (input.item) {
      const inventory = await getInventory(ctx.player.id, ctx.player.inventory_id)
      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      const itemType = input.item.type
      // Bank only supports 'weapon', 'armor', 'potion' (not 'left_weapon' or 'right_weapon')
      if (itemType === 'left_weapon' || itemType === 'right_weapon') {
        throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
      }

      switch (itemType) {
        case 'armor': {
          const inventoryItem = inventory.armors_inventory.find((x) => x.id === input.item!.id)
          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await depositItemTransaction(bankAccount.id, 'armor', inventoryItem.id, inventoryItem.armor_id)
          break
        }
        case 'weapon': {
          const inventoryItem = inventory.weapons_inventory.find((x) => x.id === input.item!.id)
          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await depositItemTransaction(bankAccount.id, 'weapon', inventoryItem.id, inventoryItem.weapon_id)
          break
        }
        case 'potion': {
          const inventoryItem = inventory.potions_inventory.find((x) => x.id === input.item!.id)
          if (!inventoryItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await depositItemTransaction(bankAccount.id, 'potion', inventoryItem.id, inventoryItem.potion_id)
          break
        }
      }
    }
  })

export const withdrawItem = playerProcedure
  .createServerAction()
  .input(bankActionSchema)
  .handler(async ({ input, ctx }) => {
    const bankAccount = await getBankAccount(input.bankId, ctx.player.id)
    if (!bankAccount) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    if (input.money) {
      const balance = bankAccount.money - input.money
      if (balance < 0) throw new Error(ERROR_CAUSE.INSUFFICIENT_FUNDS)
      await withdrawMoney(bankAccount.id, ctx.user.id, input.money, ctx.user.money)
    }

    if (input.item) {
      const inventory = await getInventory(ctx.player.id, ctx.player.inventory_id)
      if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

      const itemType = input.item.type
      // Bank only supports 'weapon', 'armor', 'potion' (not 'left_weapon' or 'right_weapon')
      if (itemType === 'left_weapon' || itemType === 'right_weapon') {
        throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
      }

      switch (itemType) {
        case 'armor': {
          const bankItem = bankAccount.armors.find((x) => x.id === input.item!.id)
          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await withdrawItemTransaction(inventory.id, 'armor', bankItem.id, bankItem.armor_id)
          break
        }
        case 'weapon': {
          const bankItem = bankAccount.weapons.find((x) => x.id === input.item!.id)
          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await withdrawItemTransaction(inventory.id, 'weapon', bankItem.id, bankItem.weapon_id)
          break
        }
        case 'potion': {
          const bankItem = bankAccount.potions.find((x) => x.id === input.item!.id)
          if (!bankItem) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
          await withdrawItemTransaction(inventory.id, 'potion', bankItem.id, bankItem.potion_id)
          break
        }
      }
    }
  })
