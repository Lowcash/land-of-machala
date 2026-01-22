import { InventoryItemUI, ItemRarity, ItemType } from '@/components/features/Inventory/Shared/types'
import { getMyCharacterAction } from '@/lib/actions/character'

export async function getInventoryPageData() {
  const [result, error] = await getMyCharacterAction()

  if (error || !result?.character) {
    return null
  }

  const character = result.character

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
    inventory = [
      {
        id: 'dummy-inv-1',
        name: 'Rezavý Meč',
        type: 'weapon',
        rarity: 'common',
        iconName: 'sword',
        slot: 'right_hand',
        equipped: true,
        value: 10,
        level: 1,
        description: 'Starý, ale stále ostrý meč.',
        quantity: 1,
        attack: 5,
      },
      {
        id: 'dummy-inv-2',
        name: 'Léčivý Lektvar',
        type: 'consumable',
        rarity: 'common',
        iconName: 'flask',
        equipped: false,
        value: 20,
        level: 1,
        description: 'Obnoví 50 zdraví.',
        quantity: 3,
        healing: 50,
      },
      {
        id: 'dummy-inv-3',
        name: 'Kožená Zbroj',
        type: 'armor',
        rarity: 'uncommon',
        iconName: 'shield',
        slot: 'chest',
        equipped: false,
        value: 50,
        level: 2,
        description: 'Základní ochrana pro dobrodruhy.',
        quantity: 1,
        defense: 10,
      },
    ] as InventoryItemUI[]
  }

  return {
    characterId: character.id,
    inventory,
  }
}
