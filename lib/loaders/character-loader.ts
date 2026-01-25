import { getCharacterByUserId } from '@/entity/character'
import { auth } from '@/lib/auth'

export async function getCharacterPageData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const character = await getCharacterByUserId(session.user.id)

  if (!character) {
    return null
  }

  // Map server data to client props
  const clientProps = {
    // Note: We don't pass characterId here as it's not in clientProps,
    // but we pass it to PageTemplate for the header
    character: {
      id: character.id,
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
      reputation: 0,
      gold: character.gold,
      bankGold: character.bankGold,
      talentPoints: character.talentPoints,
    },
    inventory: character.inventory.map((inv) => ({
      id: inv.id,
      name: inv.item.name,
      slot: inv.item.slot,
      attack: inv.item.strength,
      defense: inv.item.stamina,
      value: inv.item.value,
      equipped: inv.equipped,
    })),
  }

  return {
    characterId: character.id,
    clientProps,
  }
}
