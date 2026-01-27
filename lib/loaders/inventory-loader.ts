import { getCharacterByUserId } from '@/entity/character'

import { auth } from '@/lib/auth'
import { DUMMY_INVENTORY } from '@/lib/game/inventory'

import type {
  InventoryItemUI,
  ItemRarity,
  ItemType,
} from '@/components/features/Inventory/Shared/types'

export async function getInventoryPageData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)

  if (!character) {
    return null
  }

  let inventory: InventoryItemUI[] = character.inventory.map((invItem) => ({
    id: invItem.id,
    name: invItem.item.name,
    type: invItem.item.type.toLowerCase() as ItemType,
    rarity: invItem.item.rarity.toLowerCase() as ItemRarity,
    iconName: invItem.item.iconName,
    slot: invItem.item.slot,
    equipped: invItem.equipped,
    value: invItem.item.value,
    level: 1,
    description: invItem.item.description,
    quantity: invItem.quantity,
    attack: invItem.item.strength,
    defense: invItem.item.stamina,
    magic: invItem.item.intelligence,
    speed: invItem.item.agility,
    healing: invItem.item.healing,
    mana: invItem.item.manaRestore,
  }))

  if (inventory.length === 0) {
    inventory = DUMMY_INVENTORY
  }

  return {
    character,
    inventory,
  }
}
