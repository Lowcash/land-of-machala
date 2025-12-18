import { getMyCharacterAction } from '@/lib/actions/character'
import { CombatClient } from './CombatClient'

export async function CombatPanel() {
  const [characterData, err] = await getMyCharacterAction()

  if (err || !characterData?.character) {
    return (
      <div className="flex h-full items-center justify-center text-[#d4a574]">
        Načítání postavy selhalo nebo postava neexistuje.
      </div>
    )
  }

  const { character } = characterData

  // Map inventory items to the format expected by CombatClient
  const inventory = character.inventory.map((invItem: any) => ({
    id: invItem.id,
    name: invItem.item.name,
    type: invItem.item.type.toLowerCase(),
    icon: null, // Icons will be handled in client component or mapped here if possible
    attack: invItem.item.attack || 0,
    defense: invItem.item.defense || 0,
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
