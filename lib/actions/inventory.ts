'use server'

import {
  equipInventoryItem,
  sellInventoryItem,
  unequipInventoryItem,
  useInventoryItem,
} from '@/entity/inventory'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

const itemActionSchema = z.object({
  inventoryItemId: z.string(),
})

export const equipItemAction = createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    const { getCharacterByUserId } = await import('@/entity/character')
    const character = await getCharacterByUserId(session.user.id)

    if (!character) throw new Error('Character not found')

    await equipInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })

export const unequipItemAction = createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    const { getCharacterByUserId } = await import('@/entity/character')
    const character = await getCharacterByUserId(session.user.id)

    if (!character) throw new Error('Character not found')

    await unequipInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })

export const useItemAction = createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    const { getCharacterByUserId } = await import('@/entity/character')
    const character = await getCharacterByUserId(session.user.id)

    if (!character) throw new Error('Character not found')

    await useInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })

export const sellItemAction = createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input }) => {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    const { getCharacterByUserId } = await import('@/entity/character')
    const character = await getCharacterByUserId(session.user.id)

    if (!character) throw new Error('Character not found')

    await sellInventoryItem(character.id, input.inventoryItemId)
    revalidatePath('/inventory')
    return { success: true }
  })
