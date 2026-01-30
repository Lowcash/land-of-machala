'use server'

import { revalidatePath } from 'next/cache'

import { healCharacter, restoreMana } from '@/entity/character'
import {
  consumeInventoryItem,
  equipInventoryItem,
  sellInventoryItem,
  unequipInventoryItem,
} from '@/entity/inventory'

import { prisma } from '@/lib/db'
import { getConsumableEffects } from '@/lib/game/inventory'
import { itemActionSchema } from '@/lib/schemas/inventory'

import { logActivity } from './activity-log'
import { characterProcedure } from './procedures'

export const equipItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    await equipInventoryItem(character.id, input.inventoryItemId)
    await logActivity(character.id, 'info', 'Předmět byl nasazen.')
    revalidatePath('/inventory')
    return { success: true }
  })

export const unequipItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    await unequipInventoryItem(character.id, input.inventoryItemId)
    await logActivity(character.id, 'info', 'Předmět byl sundán.')
    revalidatePath('/inventory')
    return { success: true }
  })

export const consumeItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx

    // 1. Fetch item to check properties (Action logic)
    // Ideally this fetch should be optimized or passed in, but for safety we fetch.
    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id: input.inventoryItemId },
      include: { item: true },
    })

    if (!inventoryItem || inventoryItem.characterId !== character.id) {
      throw new Error('Item not found')
    }

    // 2. Validate & Calculate Effects (Game Logic)
    const effects = getConsumableEffects(inventoryItem.item)

    // 3. Apply Effects (Entity/DAL)
    if (effects.healing > 0) {
      await healCharacter(character.id, effects.healing)
    }
    if (effects.manaRestore > 0) {
      await restoreMana(character.id, effects.manaRestore)
    }

    // 4. Consume Item (Entity/DAL)
    await consumeInventoryItem(character.id, input.inventoryItemId, 1)

    // 5. Log activity
    let logMsg = `Použil jsi ${inventoryItem.item.name}.`
    if (effects.healing > 0 && effects.manaRestore > 0) {
      logMsg += ` (+${effects.healing} HP, +${effects.manaRestore} Mana)`
    } else if (effects.healing > 0) {
      logMsg += ` (+${effects.healing} HP)`
    } else if (effects.manaRestore > 0) {
      logMsg += ` (+${effects.manaRestore} Mana)`
    }
    await logActivity(character.id, effects.healing > 0 ? 'heal' : 'mana', logMsg)

    revalidatePath('/inventory')
    return {
      success: true,
      message: logMsg,
      healing: effects.healing,
      mana: effects.manaRestore,
    }
  })

export const sellItemAction = characterProcedure
  .createServerAction()
  .input(itemActionSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    await sellInventoryItem(character.id, input.inventoryItemId)
    await logActivity(character.id, 'loot', 'Prodán předmět na tržišti.')
    revalidatePath('/inventory')
    return { success: true }
  })
