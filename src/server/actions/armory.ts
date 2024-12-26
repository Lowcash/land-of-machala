'use server'

import { z } from 'zod'
import { db } from '../db'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import * as _Armory from './_armory'
import * as PlayerAction from './player'
import * as InventoryAction from './inventory'

import { ERROR_CAUSE, WEARABLES } from '@/const'

export const get = protectedAction.input(z.object({ armoryId: z.string() })).query(async ({ input }) => {
  const armory = await db.armory.findFirst({
    where: { id: input.armoryId },
    include: {
      weapons: { include: { weapon: true } },
      armors: { include: { armor: true } },
    },
  })

  if (!armory) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return armory
})

export const show = protectedAction.input(z.object({ armoryId: z.string() })).query(async ({ input }) => {
  const armory = await get({ armoryId: input.armoryId })

  const [buyWeapons, buyArmors, sellWeapons, sellArmors] = await Promise.all([
    _Armory.getBuyWeapons({ armoryId: armory.id }),
    _Armory.getBuyArmors({ armoryId: armory.id }),
    _Armory.getSellWeapons(),
    _Armory.getSellArmors(),
  ])

  return { ...armory, buyWeapons, buyArmors, sellWeapons, sellArmors }
})

export const buyItem = protectedAction
  .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), armoryItemType: z.enum(WEARABLES) }))
  .mutation(async ({ input }) => {
    const player = await PlayerAction.get()

    switch (input.armoryItemType) {
      case 'weapon': {
        const armoryWeapon = (await _Armory.getBuyWeapons({ armoryId: input.armoryId })).find(
          (x) => x.id === input.armoryItemId,
        )

        if (!armoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money - (armoryWeapon?.price ?? 0)

        if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })

          await db.weaponInInventory.create({
            data: {
              weapon_id: armoryWeapon.weapon_id,
              inventory_id: (await InventoryAction.get()).id,
            },
          })
        })

        break
      }
      case 'armor': {
        const armoryArmor = (await _Armory.getBuyArmors({ armoryId: input.armoryId })).find(
          (x) => x.id === input.armoryItemId,
        )

        if (!armoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money - (armoryArmor?.price ?? 0)

        if (balance < 0) throw getTRPCErrorFromUnknown(ERROR_CAUSE.INSUFFICIENT_FUNDS)

        await db.$transaction(async (db) => {
          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })

          await db.armorInInventory.create({
            data: {
              armor_id: armoryArmor.armor_id,
              inventory_id: (await InventoryAction.get()).id,
            },
          })
        })

        break
      }
    }
  })

export const sellItem = protectedAction
  .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), armoryItemType: z.enum(WEARABLES) }))
  .mutation(async ({ input }) => {
    const player = await PlayerAction.get()

    switch (input.armoryItemType) {
      case 'weapon': {
        const armoryWeapon = (await _Armory.getSellWeapons()).find((x) => x.id === input.armoryItemId)

        if (!armoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money + (armoryWeapon?.price ?? 0)

        await db.$transaction(async (db) => {
          const weaponToDelete = await db.weaponInInventory.findFirst({
            where: {
              inventory_id: (await InventoryAction.get()).id,
              weapon_id: armoryWeapon.weapon_id,
            },
          })

          if (!weaponToDelete) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

          await db.weaponInInventory.delete({
            where: {
              id: weaponToDelete.id,
            },
          })

          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })
        })

        break
      }
      case 'armor': {
        const armoryArmor = (await _Armory.getSellArmors()).find((x) => x.id === input.armoryItemId)

        if (!armoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money + (armoryArmor?.price ?? 0)

        await db.$transaction(async (db) => {
          const armorToDelete = await db.armorInInventory.findFirst({
            where: {
              inventory_id: (await InventoryAction.get()).id,
              armor_id: armoryArmor.armor_id,
            },
          })

          if (!armorToDelete) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

          await db.armorInInventory.delete({
            where: {
              id: armorToDelete.id,
            },
          })

          await db.user.update({
            where: { id: player.id },
            data: { money: balance },
          })
        })

        break
      }
    }
  })
