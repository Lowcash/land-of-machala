import { getMyCharacterAction } from '@/lib/actions/character'
import { CombatClient } from './CombatClient'

interface InventoryItem {
  id: string
  item: {
    name: string
    type: string
    iconName: string
    strength: number
    stamina: number
    magic?: number
    speed?: number
    healing?: number
    mana?: number
    slot?: string
    intelligence?: number
    agility?: number
  }
  equipped: boolean
  isEquipped: boolean
}

export async function CombatPanel() {
  const [characterData] = await getMyCharacterAction()

  if (!characterData?.character) {
    return (
      <div className="flex h-full items-center justify-center text-[#d4a574]">
        Načítání postavy selhalo nebo postava neexistuje.
      </div>
    )
  }

  const { character } = characterData

  // Map inventory items to the format expected by CombatClient
  const inventory = character.inventory.map((invItem: InventoryItem) => ({
    id: invItem.id,
    name: invItem.item.name,
    type: invItem.item.type.toLowerCase(),
    iconName: invItem.item.iconName,
    attack: invItem.item.strength, // Mapping strength to attack for now
    defense: invItem.item.stamina, // Mapping stamina to defense for now
    magic: invItem.item.magic || 0,
    speed: invItem.item.speed || 0,
    healing: invItem.item.healing || 0,
    mana: invItem.item.mana || 0,
    slot: invItem.item.slot?.toLowerCase(),
    equipped: invItem.isEquipped,
    strength: invItem.item.strength || 0,
    intelligence: invItem.item.intelligence || 0,
    agility: invItem.item.agility || 0,
    stamina: invItem.item.stamina || 0,
  }))

  return <CombatClient character={character} inventory={inventory} />
}
