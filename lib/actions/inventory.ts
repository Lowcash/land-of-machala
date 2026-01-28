'use server'

import { revalidatePath } from 'next/cache'

import {
  equipInventoryItem,
  sellInventoryItem,
  unequipInventoryItem,
  useInventoryItem,
} from '@/entity/inventory'

import { itemActionSchema } from '@/lib/schemas/inventory'

import { characterProcedure } from './procedures'

export const equipItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    await equipInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })

export const unequipItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    await unequipInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })

export const useItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    await useInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })

export const sellItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    await sellInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })
