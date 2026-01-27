import { healCharacter, restoreMana, updateCharacterResources } from '@/entity/character'
import { ItemType } from '@prisma/client'

import { prisma } from '@/lib/db'

/**
 * Inventory Entity Layer
 * Handles character inventory and equipment management
 */

export async function getInventory(characterId: string) {
  return await prisma.inventoryItem.findMany({
    where: { characterId },
    include: {
      item: true,
    },
    orderBy: [{ equipped: 'desc' }, { item: { rarity: 'desc' } }],
  })
}

export async function getEquippedItems(characterId: string) {
  return await prisma.inventoryItem.findMany({
    where: {
      characterId,
      equipped: true,
    },
    include: {
      item: true,
    },
  })
}

export async function addItem(characterId: string, itemId: string, quantity = 1) {
  // Try to find an unequipped stack first
  const existingItem = await prisma.inventoryItem.findFirst({
    where: {
      characterId,
      itemId,
      equipped: false,
    },
  })

  if (existingItem) {
    return await prisma.inventoryItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
      include: {
        item: true,
      },
    })
  }

  return await prisma.inventoryItem.create({
    data: {
      characterId,
      itemId,
      quantity,
    },
    include: {
      item: true,
    },
  })
}

export async function removeItem(characterId: string, itemId: string, quantity = 1) {
  // Prefer removing from unequipped stacks first
  const inventoryItem = await prisma.inventoryItem.findFirst({
    where: {
      characterId,
      itemId,
      equipped: false,
    },
  })

  if (!inventoryItem) {
    // Try equipped items if no unequipped found
    const equippedItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId,
        itemId,
        equipped: true,
      },
    })

    if (!equippedItem) {
      throw new Error('Item not found in inventory')
    }

    if (equippedItem.quantity <= quantity) {
      return await prisma.inventoryItem.delete({
        where: { id: equippedItem.id },
      })
    }

    return await prisma.inventoryItem.update({
      where: { id: equippedItem.id },
      data: { quantity: equippedItem.quantity - quantity },
      include: { item: true },
    })
  }

  if (inventoryItem.quantity <= quantity) {
    return await prisma.inventoryItem.delete({
      where: {
        id: inventoryItem.id,
      },
    })
  }

  return await prisma.inventoryItem.update({
    where: {
      id: inventoryItem.id,
    },
    data: {
      quantity: inventoryItem.quantity - quantity,
    },
    include: {
      item: true,
    },
  })
}

// Legacy support - deprecated
export async function equipItem(characterId: string, itemId: string) {
  const inventoryItem = await prisma.inventoryItem.findFirst({
    where: {
      characterId,
      itemId,
    },
    include: {
      item: true,
    },
  })

  if (!inventoryItem) throw new Error('Item not found')
  return equipInventoryItem(characterId, inventoryItem.id)
}

// Legacy support - deprecated
export async function unequipItem(characterId: string, itemId: string) {
  const inventoryItem = await prisma.inventoryItem.findFirst({
    where: {
      characterId,
      itemId,
    },
  })

  if (!inventoryItem) throw new Error('Item not found')
  return unequipInventoryItem(characterId, inventoryItem.id)
}

// New function using InventoryItem ID
export async function equipInventoryItem(characterId: string, inventoryItemId: string) {
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { id: inventoryItemId },
    include: { item: true },
  })

  if (!inventoryItem || inventoryItem.characterId !== characterId) {
    throw new Error('Item not found')
  }

  if (!inventoryItem.item.slot) {
    throw new Error('Item cannot be equipped')
  }

  // If stack > 1, we need to split it
  if (inventoryItem.quantity > 1) {
    // Reduce quantity of current stack
    await prisma.inventoryItem.update({
      where: { id: inventoryItemId },
      data: { quantity: inventoryItem.quantity - 1 },
    })

    // Create new item for the equipped one
    const newItem = await prisma.inventoryItem.create({
      data: {
        characterId,
        itemId: inventoryItem.itemId,
        quantity: 1,
        equipped: true,
      },
      include: { item: true },
    })

    // Unequip others in slot
    await prisma.inventoryItem.updateMany({
      where: {
        characterId,
        equipped: true,
        id: { not: newItem.id },
        item: { slot: inventoryItem.item.slot },
      },
      data: { equipped: false },
    })

    return newItem
  }

  // Normal case (qty 1)
  // Unequip others in slot
  await prisma.inventoryItem.updateMany({
    where: {
      characterId,
      equipped: true,
      id: { not: inventoryItemId },
      item: { slot: inventoryItem.item.slot },
    },
    data: { equipped: false },
  })

  return await prisma.inventoryItem.update({
    where: { id: inventoryItemId },
    data: { equipped: true },
    include: { item: true },
  })
}

export async function unequipInventoryItem(characterId: string, inventoryItemId: string) {
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { id: inventoryItemId },
    include: { item: true },
  })

  if (!inventoryItem || inventoryItem.characterId !== characterId) {
    throw new Error('Item not found')
  }

  return await prisma.inventoryItem.update({
    where: { id: inventoryItemId },
    data: { equipped: false },
    include: { item: true },
  })
}

export async function useInventoryItem(characterId: string, inventoryItemId: string) {
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { id: inventoryItemId },
    include: { item: true },
  })

  if (!inventoryItem || inventoryItem.characterId !== characterId) {
    throw new Error('Item not found')
  }

  if (inventoryItem.item.type !== ItemType.CONSUMABLE) {
    throw new Error('Item is not consumable')
  }

  // Apply effects
  if (inventoryItem.item.healing > 0) {
    await healCharacter(characterId, inventoryItem.item.healing)
  }

  if (inventoryItem.item.manaRestore > 0) {
    await restoreMana(characterId, inventoryItem.item.manaRestore)
  }

  // Consume item
  if (inventoryItem.quantity <= 1) {
    await prisma.inventoryItem.delete({ where: { id: inventoryItemId } })
    return null // Item gone
  } else {
    return await prisma.inventoryItem.update({
      where: { id: inventoryItemId },
      data: { quantity: inventoryItem.quantity - 1 },
      include: { item: true },
    })
  }
}

export async function sellInventoryItem(characterId: string, inventoryItemId: string) {
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { id: inventoryItemId },
    include: { item: true },
  })

  if (!inventoryItem || inventoryItem.characterId !== characterId) {
    throw new Error('Item not found')
  }

  const sellValue = Math.floor(inventoryItem.item.value * 0.5)

  // Add gold
  const character = await prisma.character.findUnique({ where: { id: characterId } })
  if (character) {
    await updateCharacterResources(characterId, { gold: character.gold + sellValue })
  }

  // Remove item (1 qty)
  if (inventoryItem.quantity <= 1) {
    await prisma.inventoryItem.delete({ where: { id: inventoryItemId } })
    return null
  } else {
    return await prisma.inventoryItem.update({
      where: { id: inventoryItemId },
      data: { quantity: inventoryItem.quantity - 1 },
      include: { item: true },
    })
  }
}

export async function getBankItems(characterId: string) {
  return await prisma.bankItem.findMany({
    where: { characterId },
    include: {
      item: true,
    },
    orderBy: [{ item: { rarity: 'desc' } }],
  })
}

export async function depositToBank(characterId: string, itemId: string, quantity = 1) {
  // Remove from inventory
  await removeItem(characterId, itemId, quantity)

  // Add to bank
  const existingBankItem = await prisma.bankItem.findFirst({
    where: {
      characterId,
      itemId,
    },
  })

  if (existingBankItem) {
    return await prisma.bankItem.update({
      where: { id: existingBankItem.id },
      data: {
        quantity: existingBankItem.quantity + quantity,
      },
      include: {
        item: true,
      },
    })
  }

  return await prisma.bankItem.create({
    data: {
      characterId,
      itemId,
      quantity,
    },
    include: {
      item: true,
    },
  })
}

export async function withdrawFromBank(characterId: string, itemId: string, quantity = 1) {
  const bankItem = await prisma.bankItem.findFirst({
    where: {
      characterId,
      itemId,
    },
  })

  if (!bankItem) {
    throw new Error('Item not found in bank')
  }

  if (bankItem.quantity <= quantity) {
    await prisma.bankItem.delete({
      where: { id: bankItem.id },
    })
  } else {
    await prisma.bankItem.update({
      where: { id: bankItem.id },
      data: {
        quantity: bankItem.quantity - quantity,
      },
    })
  }

  // Add to inventory
  return await addItem(characterId, itemId, quantity)
}
