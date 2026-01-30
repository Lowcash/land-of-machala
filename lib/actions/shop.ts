'use server'

import { revalidatePath } from 'next/cache'

import { healCharacter, updateCharacterResources } from '@/entity/character'
import { addItem } from '@/entity/inventory'

import { prisma } from '@/lib/db'
import { buyItemSchema, purchaseServiceSchema, sellItemSchema } from '@/lib/schemas/shop'

import { logActivity } from './activity-log'
import { characterProcedure } from './procedures'

/**
 * Shop Server Actions
 * Handles buying items, selling items, and purchasing services.
 */

export const buyItemAction = characterProcedure
  .createServerAction()
  .input(buyItemSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { itemId, itemName, price } = input

    // 1. Validate gold
    if (character.gold < price) {
      throw new Error('Nedostatek zlata')
    }

    // 2. Fetch item
    let item
    if (itemId) {
      item = await prisma.item.findUnique({
        where: { id: itemId },
      })
    } else if (itemName) {
      item = await prisma.item.findFirst({
        where: { name: itemName },
      })
    }

    if (!item) {
      throw new Error(`Předmět ${itemName || itemId} nenalezen v databázi`)
    }

    // 3. Deduct gold (Atomic update)
    await prisma.character.update({
      where: { id: character.id },
      data: { gold: { decrement: price } },
    })

    // 4. Add item to inventory
    await addItem(character.id, item.id, 1)

    // 5. Log activity
    await logActivity(character.id, 'loot', `Koupen předmět ${item.name} za ${price}g.`)

    revalidatePath('/')
    return { success: true, message: `Koupeno: ${item.name}` }
  })

export const sellItemAction = characterProcedure
  .createServerAction()
  .input(sellItemSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { inventoryItemId, price } = input

    // 1. Fetch inventory item
    const invItem = await prisma.inventoryItem.findUnique({
      where: { id: inventoryItemId },
      include: { item: true },
    })

    if (!invItem || invItem.characterId !== character.id) {
      throw new Error('Předmět nenalezen ve tvém inventáři')
    }

    // 2. Add gold
    await prisma.character.update({
      where: { id: character.id },
      data: { gold: { increment: price } },
    })

    // 3. Remove item (decrement quantity or delete)
    if (invItem.quantity <= 1) {
      await prisma.inventoryItem.delete({
        where: { id: inventoryItemId },
      })
    } else {
      await prisma.inventoryItem.update({
        where: { id: inventoryItemId },
        data: { quantity: { decrement: 1 } },
      })
    }

    // 4. Log activity
    await logActivity(character.id, 'loot', `Prodán předmět ${invItem.item.name} za ${price}g.`)

    revalidatePath('/')
    return { success: true, message: `Prodáno: ${invItem.item.name}` }
  })

export const purchaseServiceAction = characterProcedure
  .createServerAction()
  .input(purchaseServiceSchema)
  .handler(async ({ input, ctx }) => {
    const { character } = ctx
    const { serviceId } = input

    // Healer prices are currently hardcoded in constants,
    // but we'll use a switch for now to handle logic.
    // In a mature system, these would be in the DB.

    let price = 0
    let message = ''
    let logMsg = ''

    switch (serviceId) {
      case 'heal':
        price = 50
        if (character.gold < price) throw new Error('Nedostatek zlata')
        await updateCharacterResources(character.id, { gold: character.gold - price })
        await healCharacter(character.id, character.maxHp) // Full heal
        message = 'Léčitel ti vyčistil rány. Cítíš se lépe.'
        logMsg = 'Zakoupeno léčení u léčitele.'
        break
      case 'str-buff':
      case 'sta-buff':
        price = 100
        if (character.gold < price) throw new Error('Nedostatek zlata')
        await updateCharacterResources(character.id, { gold: character.gold - price })

        const buffType = serviceId === 'str-buff' ? 'STR' : 'STA'
        const buffValue = 5
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

        await prisma.characterBuff.upsert({
          where: {
            characterId_type: {
              characterId: character.id,
              type: buffType,
            },
          },
          update: {
            value: buffValue,
            expiresAt,
          },
          create: {
            characterId: character.id,
            type: buffType,
            value: buffValue,
            expiresAt,
          },
        })

        message =
          serviceId === 'str-buff' ? 'Cítíš příliv nové síly!' : 'Tvá kůže ztvrdla jako kámen!'
        logMsg = `Zakoupeno požehnání: ${serviceId === 'str-buff' ? 'Síla' : 'Výdrž'}`
        break
      case 'bribe':
        price = 50
        if (character.gold < price) throw new Error('Nedostatek zlata')
        await updateCharacterResources(character.id, { gold: character.gold - price })
        message = 'Strážce přijal úplatek a pustil tě dál.'
        logMsg = 'Uplacen strážce uličky.'
        break
      default:
        throw new Error('Neznámá služba')
    }

    await logActivity(character.id, 'info', logMsg)

    revalidatePath('/')
    return { success: true, message }
  })
