import { getMyCharacterAction } from '@/lib/actions/character'
import { CharacterClient } from './CharacterClient'

export async function CharacterPanel() {
  const [result, error] = await getMyCharacterAction()

  if (error || !result?.character) {
    return (
      <div className="p-8 text-center text-[#d4a574]">
        Nebyla nalezena postava. Prosím vytvořte si novou postavu.
      </div>
    )
  }

  const character = result.character

  // Map server data to client props
  const clientProps = {
    characterId: character.id,
    character: {
      name: character.name,
      level: character.level,
      race: character.race,
      class: character.class,
      experience: character.experience,
      hp: character.hp,
      maxHp: character.maxHp,
      mana: character.mana,
      maxMana: character.maxMana,
      strength: character.strength,
      intelligence: character.intelligence,
      agility: character.agility,
      stamina: character.stamina,
      physicalResistance: character.physicalResistance,
      magicalResistance: character.magicalResistance,
      fireResistance: character.fireResistance,
      coldResistance: character.coldResistance,
      poisonResistance: character.poisonResistance,
      reputation: 0, // Default for now as it might not be in DB yet
    },
    inventory: character.inventory.map((inv) => ({
      id: inv.id,
      name: inv.item.name,
      slot: inv.item.slot,
      attack: inv.item.strength, // Mapping strength to attack for now
      defense: inv.item.stamina, // Mapping stamina to defense for now
      value: inv.item.value,
      equipped: inv.equipped,
    })),
  }

  return <CharacterClient {...clientProps} />
}
