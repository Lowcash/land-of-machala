import { getMyCharacterAction } from '@/lib/actions/character'
import { CombatClient } from './CombatClient'

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
  const inventory = character.inventory.map((invItem) => ({
    id: invItem.id,
    name: invItem.item.name,
    type: invItem.item.type.toLowerCase() as 'weapon' | 'armor' | 'consumable',
    iconName: invItem.item.iconName,
    attack: invItem.item.strength,
    defense: invItem.item.stamina,
    magic: invItem.item.intelligence,
    speed: invItem.item.agility,
    healing: invItem.item.healing || 0,
    mana: invItem.item.manaRestore || 0,
    slot: invItem.item.slot?.toLowerCase(),
    equipped: invItem.equipped || false,
    strength: invItem.item.strength || 0,
    intelligence: invItem.item.intelligence || 0,
    agility: invItem.item.agility || 0,
    stamina: invItem.item.stamina || 0,
  }))

  return <CombatClient character={character} inventory={inventory} />
}
