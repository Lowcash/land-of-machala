'use server'

import { z } from 'zod'
import { db } from '../db'
import { cache } from 'react'
import { protectedAction } from '@/server/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'
import { getPlayer } from './player'
import { getInventory } from './inventory'
import { getBuyArmors, getBuyWeapons, getSellArmors, getSellWeapons } from './_armory'

import { ERROR_CAUSE, WEARABLES } from '@/const'

export const getArmory = cache(
  protectedAction.input(z.object({ armoryId: z.string() })).query(async ({ input }) => {
    const armory = await db.armory.findFirst({
      where: { id: input.armoryId },
      include: {
        weapons: { include: { weapon: true } },
        armors: { include: { armor: true } },
      },
    })

    if (!armory) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

    return armory
  }),
)

export const showArmory = cache(
  protectedAction.input(z.object({ armoryId: z.string() })).query(async ({ input }) => {
    const armory = await getArmory({ armoryId: input.armoryId })

    const [buyWeapons, buyArmors, sellWeapons, sellArmors] = await Promise.all([
      getBuyWeapons({ armoryId: armory.id }),
      getBuyArmors({ armoryId: armory.id }),
      getSellWeapons(),
      getSellArmors(),
    ])

    return { ...armory, buyWeapons, buyArmors, sellWeapons, sellArmors }
  }),
)

export const buy = protectedAction
  .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), armoryItemType: z.enum(WEARABLES) }))
  .mutation(async ({ input }) => {
    const player = await getPlayer()

    switch (input.armoryItemType) {
      case 'weapon': {
        const armoryWeapon = (await getBuyWeapons({ armoryId: input.armoryId })).find(
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
              inventory_id: (await getInventory()).id,
            },
          })
        })

        break
      }
      case 'armor': {
        const armoryArmor = (await getBuyArmors({ armoryId: input.armoryId })).find((x) => x.id === input.armoryItemId)

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
              inventory_id: (await getInventory()).id,
            },
          })
        })

        break
      }
    }
  })

export const sell = protectedAction
  .input(z.object({ armoryId: z.string(), armoryItemId: z.string(), armoryItemType: z.enum(WEARABLES) }))
  .mutation(async ({ input }) => {
    const player = await getPlayer()

    switch (input.armoryItemType) {
      case 'weapon': {
        const armoryWeapon = (await getSellWeapons()).find((x) => x.id === input.armoryItemId)

        if (!armoryWeapon) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money + (armoryWeapon?.price ?? 0)

        await db.$transaction(async (db) => {
          const weaponToDelete = await db.weaponInInventory.findFirst({
            where: {
              inventory_id: (await getInventory()).id,
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
        const armoryArmor = (await getSellArmors()).find((x) => x.id === input.armoryItemId)

        if (!armoryArmor) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

        const balance = player.money + (armoryArmor?.price ?? 0)

        await db.$transaction(async (db) => {
          const armorToDelete = await db.armorInInventory.findFirst({
            where: {
              inventory_id: (await getInventory()).id,
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
