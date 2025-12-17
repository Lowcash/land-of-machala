import { getMyCharacterAction } from '@/lib/actions/character'
import { InventoryClient } from './InventoryClient'
import type { InventoryItemUI, ItemRarity, ItemType } from './types'

export async function InventoryPanel() {
  const [result, error] = await getMyCharacterAction()

  if (error || !result?.character) {
    return (
      <div className="p-8 text-center text-[#d4a574]">
        Nebyla nalezena postava. Prosím vytvořte si novou postavu.
      </div>
    )
  }

  const character = result.character

  const inventory: InventoryItemUI[] = character.inventory.map((invItem) => ({
    id: invItem.id,
    name: invItem.item.name,
    type: invItem.item.type.toLowerCase() as ItemType,
    rarity: invItem.item.rarity.toLowerCase() as ItemRarity,
    iconName: invItem.item.iconName,
    slot: invItem.item.slot,
    equipped: invItem.equipped,
    value: invItem.item.value,
    level: 1, // Default level as it's not in the schema yet
    description: invItem.item.description,
    quantity: invItem.quantity,
    attack: invItem.item.strength, // Mapping strength to attack for display
    defense: invItem.item.stamina, // Mapping stamina to defense for display
    magic: invItem.item.intelligence,
    speed: invItem.item.agility,
    healing: invItem.item.healing,
    mana: invItem.item.manaRestore,
  }))

  return <InventoryClient initialInventory={inventory} gold={character.gold} />
}
