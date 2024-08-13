'use server'

import { z } from 'zod'
import { db } from '../db'
import { cache } from 'react'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlayer } from './player'
import { getInventory } from './inventory'
import {
  isArmorInBank,
  isArmorInInventory,
  isPotionInBank,
  isPotionInInventory,
  isWeaponInBank,
  isWeaponInInventory,
} from './_bank'

import { ERROR_CAUSE, WEARABLES } from '@/const'

export const getBank = cache(
  protectedAction.input(z.object({ bankId: z.string() })).query(async ({ input }) => {
    const bank = await db.bank.findFirst({
      where: { id: input.bankId },
    })

    if (!bank) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    return bank
  }),
)

export const getBankAccount = cache(
  protectedAction.input(z.object({ bankId: z.string() })).query(async ({ input, ctx }) => {
    let bankAccount = await db.bankAccount.findFirst({
      where: { bank_id: input.bankId, user_id: ctx.user.id },
      include: {
        weapons: { include: { weapon: true } },
        armors: { include: { armor: true } },
        potions: { include: { potion: true } },
      },
    })

    if (!bankAccount) {
      bankAccount = await db.$transaction(async (db) => {
        const bankAccount = await db.bankAccount.create({
          data: { bank_id: input.bankId, user_id: ctx.user.id },
          include: {
            weapons: { include: { weapon: true } },
            armors: { include: { armor: true } },
            potions: { include: { potion: true } },
          },
        })

        await db.bank.update({
          where: { id: input.bankId },
          data: {
            accounts: { connect: { id: bankAccount.id } },
          },
        })

        return bankAccount
      })
    }

    if (!bankAccount) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    return bankAccount
  }),
)

export const deposit = protectedAction
  .input(
    z.object({
      bankId: z.string(),
      money: z.number().optional(),
      item: z.object({ id: z.string(), type: z.enum(WEARABLES) }).optional(),
    }),
  )
  .mutation(async ({ input }) => {
    const player = await getPlayer()
    const bankAccount = await getBankAccount({ bankId: input.bankId })

    if (input.money !== undefined) {
      const balance = player.money - input.money

      if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

      await db.$transaction(async (db) => {
        await db.bankAccount.update({
          where: { id: bankAccount.id },
          data: { money: bankAccount.money + input.money! },
        })

        await db.user.update({
          where: { id: player.id },
          data: { money: balance },
        })
      })
    }

    if (input.item !== undefined) {
      function getInventoryItem() {
        switch (input.item?.type) {
          case 'weapon':
            return inventory.weapons_inventory.find((x) => x.id === input.item!.id)
          case 'armor':
            return inventory.armors_inventory.find((x) => x.id === input.item!.id)
          case 'potion':
            return inventory.potions_inventory.find((x) => x.id === input.item!.id)
        }
      }

      const inventory = await getInventory()
      const inventoryItem = getInventoryItem()

      if (!inventoryItem) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

      if (isWeaponInInventory(inventoryItem)) {
        await db.$transaction(async (db) => {
          await db.bankAccount.update({
            where: { id: bankAccount.id },
            data: { weapons: { create: [{ weapon_id: inventoryItem.weapon_id }] } },
          })

          await db.weaponInInventory.delete({
            where: { id: inventoryItem.id },
          })
        })
      }
      if (isArmorInInventory(inventoryItem)) {
        await db.$transaction(async (db) => {
          await db.bankAccount.update({
            where: { id: bankAccount.id },
            data: { armors: { create: [{ armor_id: inventoryItem.armor_id }] } },
          })

          await db.armorInInventory.delete({
            where: { id: inventoryItem.id },
          })
        })
      }
      if (isPotionInInventory(inventoryItem)) {
        await db.$transaction(async (db) => {
          await db.bankAccount.update({
            where: { id: bankAccount.id },
            data: { potions: { create: [{ potion_id: inventoryItem.potion_id }] } },
          })

          await db.potionInInventory.delete({
            where: { id: inventoryItem.id },
          })
        })
      }
    }
  })

export const withdraw = protectedAction
  .input(
    z.object({
      bankId: z.string(),
      money: z.number().optional(),
      item: z.object({ id: z.string(), type: z.enum(WEARABLES) }).optional(),
    }),
  )
  .mutation(async ({ input }) => {
    const player = await getPlayer()
    const bankAccount = await getBankAccount({ bankId: input.bankId })

    if (input.money !== undefined) {
      const balance = bankAccount.money - input.money

      if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

      await db.$transaction(async (db) => {
        await db.user.update({
          where: { id: player.id },
          data: { money: player.money + input.money! },
        })

        await db.bankAccount.update({
          where: { id: bankAccount.id },
          data: { money: balance },
        })
      })
    }

    if (input.item !== undefined) {
      function getBankItem() {
        switch (input.item?.type) {
          case 'weapon':
            return bankAccount.weapons.find((x) => x.id === input.item!.id)
          case 'armor':
            return bankAccount.armors.find((x) => x.id === input.item!.id)
          case 'potion':
            return bankAccount.potions.find((x) => x.id === input.item!.id)
        }
      }

      const inventory = await getInventory()
      const bankItem = getBankItem()

      if (!bankItem) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

      if (isWeaponInBank(bankItem)) {
        await db.$transaction(async (db) => {
          await db.inventory.update({
            where: { id: inventory.id },
            data: { weapons_inventory: { create: [{ weapon_id: bankItem.weapon_id }] } },
          })

          await db.weaponInBank.delete({
            where: { id: bankItem.id },
          })
        })
      }
      if (isArmorInBank(bankItem)) {
        await db.$transaction(async (db) => {
          await db.inventory.update({
            where: { id: inventory.id },
            data: { armors_inventory: { create: [{ armor_id: bankItem.armor_id }] } },
          })

          await db.armorInBank.delete({
            where: { id: bankItem.id },
          })
        })
      }
      if (isPotionInBank(bankItem)) {
        await db.$transaction(async (db) => {
          await db.inventory.update({
            where: { id: inventory.id },
            data: { potions_inventory: { create: [{ potion_id: bankItem.potion_id }] } },
          })

          await db.potionInBank.delete({
            where: { id: bankItem.id },
          })
        })
      }
    }
  })
