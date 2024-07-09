import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { getInventory } from './inventory'
import type { TRPCContext } from '@/server/api/trpc'
import type {
  ArmorInBank,
  ArmorInInventory,
  PotionInBank,
  PotionInInventory,
  WeaponInBank,
  WeaponInInventory,
} from '@prisma/client'

import { WEARABLES } from '@/const'

export const bankRoute = createTRPCRouter({
  show: protectedProcedure.input(z.object({ bankId: z.string() })).query(async ({ ctx, input }) => {
    const { accounts, ...bank } = await getBank(ctx, input.bankId)

    return bank
  }),
  showAccount: protectedProcedure
    .input(z.object({ bankId: z.string() }))
    .query(({ ctx, input }) => getBankAccount(ctx, input.bankId)),
  deposit: protectedProcedure
    .input(
      z.object({
        bankId: z.string(),
        money: z.number().optional(),
        item: z.object({ id: z.string(), type: z.enum(WEARABLES) }).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error('User does not exist!')

      const bankAccount = await getBankAccount(ctx, input.bankId)

      if (input.money !== undefined) {
        const balance = ctx.session.user.money - input.money

        if (balance < 0) return { success: false }

        const success = await ctx.db.$transaction(async (db) => {
          await db.bankAccount.update({
            where: { id: bankAccount.id },
            data: { money: bankAccount.money + input.money! },
          })

          await db.user.update({
            where: { id: ctx.session.user!.id },
            data: { money: balance },
          })

          return true
        })

        return { success }
      }

      if (input.item !== undefined) {
        const inventory = await getInventory(ctx)

        let inventoryItem: WeaponInInventory | ArmorInInventory | PotionInInventory | undefined
        switch (input.item.type) {
          case 'weapon':
            inventoryItem = inventory.weapons_inventory.find((x) => x.id === input.item!.id)
            break
          case 'armor':
            inventoryItem = inventory.armors_inventory.find((x) => x.id === input.item!.id)
            break
          case 'potion':
            inventoryItem = inventory.potions_inventory.find((x) => x.id === input.item!.id)
            break
        }

        if (!inventoryItem) throw new Error('Inventory item does not exist!')

        if (isWeaponInInventory(inventoryItem)) {
          const success = await ctx.db.$transaction(async (db) => {
            await db.bankAccount.update({
              where: { id: bankAccount.id },
              data: { weapons: { create: [{ weapon_id: inventoryItem.weapon_id }] } },
            })

            await db.weaponInInventory.delete({
              where: { id: inventoryItem.id },
            })

            return true
          })

          return { success }
        }
        if (isArmorInInventory(inventoryItem)) {
          const success = await ctx.db.$transaction(async (db) => {
            await db.bankAccount.update({
              where: { id: bankAccount.id },
              data: { armors: { create: [{ armor_id: inventoryItem.armor_id }] } },
            })

            await db.armorInInventory.delete({
              where: { id: inventoryItem.id },
            })

            return true
          })

          return { success }
        }
        if (isPotionInInventory(inventoryItem)) {
          const success = await ctx.db.$transaction(async (db) => {
            await db.bankAccount.update({
              where: { id: bankAccount.id },
              data: { potions: { create: [{ potion_id: inventoryItem.potion_id }] } },
            })

            await db.potionInInventory.delete({
              where: { id: inventoryItem.id },
            })

            return true
          })

          return { success }
        }
      }
    }),
  withdraw: protectedProcedure
    .input(
      z.object({
        bankId: z.string(),
        money: z.number().optional(),
        item: z.object({ id: z.string(), type: z.enum(WEARABLES) }).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error('User does not exist!')

      const bankAccount = await getBankAccount(ctx, input.bankId)

      if (input.money !== undefined) {
        const balance = bankAccount.money - input.money

        if (balance < 0) return { success: false }

        const success = await ctx.db.$transaction(async (db) => {
          await db.user.update({
            where: { id: ctx.session.user!.id },
            data: { money: ctx.session.user!.money + input.money! },
          })

          await db.bankAccount.update({
            where: { id: bankAccount.id },
            data: { money: balance },
          })

          return true
        })

        return { success }
      }

      if (input.item !== undefined) {
        let bankItem: WeaponInBank | ArmorInBank | PotionInBank | undefined
        switch (input.item.type) {
          case 'weapon':
            bankItem = bankAccount.weapons.find((x) => x.id === input.item!.id)
            break
          case 'armor':
            bankItem = bankAccount.armors.find((x) => x.id === input.item!.id)
            break
          case 'potion':
            bankItem = bankAccount.potions.find((x) => x.id === input.item!.id)
            break
        }

        if (!bankItem) throw new Error('Bank item does not exist!')

        const inventory = await getInventory(ctx)

        if (isWeaponInBank(bankItem)) {
          const success = await ctx.db.$transaction(async (db) => {
            await db.inventory.update({
              where: { id: inventory.id },
              data: { weapons_inventory: { create: [{ weapon_id: bankItem.weapon_id }] } },
            })

            await db.weaponInBank.delete({
              where: { id: bankItem.id },
            })

            return true
          })

          return { success }
        }
        if (isArmorInBank(bankItem)) {
          const success = await ctx.db.$transaction(async (db) => {
            await db.inventory.update({
              where: { id: inventory.id },
              data: { armors_inventory: { create: [{ armor_id: bankItem.armor_id }] } },
            })

            await db.armorInBank.delete({
              where: { id: bankItem.id },
            })

            return true
          })

          return { success }
        }
        if (isPotionInBank(bankItem)) {
          const success = await ctx.db.$transaction(async (db) => {
            await db.inventory.update({
              where: { id: inventory.id },
              data: { potions_inventory: { create: [{ potion_id: bankItem.potion_id }] } },
            })

            await db.potionInBank.delete({
              where: { id: bankItem.id },
            })

            return true
          })

          return { success }
        }
      }
    }),
})

export function isWeaponInInventory(arg: any): arg is WeaponInInventory {
  return arg.weapon_id !== undefined
}

export function isArmorInInventory(arg: any): arg is ArmorInInventory {
  return arg.armor_id !== undefined
}

export function isPotionInInventory(arg: any): arg is PotionInInventory {
  return arg.potion_id !== undefined
}

export function isWeaponInBank(arg: any): arg is WeaponInBank {
  return arg.weapon_id !== undefined
}

export function isArmorInBank(arg: any): arg is ArmorInBank {
  return arg.armor_id !== undefined
}

export function isPotionInBank(arg: any): arg is PotionInBank {
  return arg.potion_id !== undefined
}

export async function getBank(ctx: TRPCContext, bankId: string) {
  const bank = await ctx.db.bank.findFirst({
    where: { id: bankId },
    include: { accounts: true },
  })

  if (!bank) throw new Error('Bank does not exist!')

  return bank
}

export async function getBankAccount(ctx: TRPCContext, bankId: string) {
  if (!ctx.session?.user) throw new Error('User does not exists!')

  let bankAccount = await ctx.db.bankAccount.findFirst({
    where: { bank_id: bankId, user_id: ctx.session.user.id },
    include: {
      weapons: { include: { weapon: true } },
      armors: { include: { armor: true } },
      potions: { include: { potion: true } },
    },
  })

  if (!bankAccount) {
    bankAccount = await ctx.db.$transaction(async (db) => {
      const _bankAccount = await db.bankAccount.create({
        data: { bank_id: bankId, user_id: ctx.session!.user.id },
        include: {
          weapons: { include: { weapon: true } },
          armors: { include: { armor: true } },
          potions: { include: { potion: true } },
        },
      })

      await db.bank.update({
        where: { id: bankId },
        data: {
          accounts: { connect: { id: _bankAccount.id } },
        },
      })

      return _bankAccount
    })
  }

  if (!bankAccount) throw new Error('Bank account does not exist!')

  return {
    ...bankAccount,
    potions: bankAccount.potions.sort((a, b) => a.potion.hp_gain - b.potion.hp_gain),
  }
}
