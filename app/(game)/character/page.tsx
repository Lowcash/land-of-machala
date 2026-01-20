import { CharacterClient } from '@/components/features/Character/CharacterClient'
import { PageTemplate } from '@/components/layout/PageTemplate'
import { getMyCharacterAction } from '@/lib/actions/character'
import { User } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CharacterPage() {
  const [result, error] = await getMyCharacterAction()

  if (error || !result?.character) {
    return (
      <PageTemplate
        title="Hrdina"
        icon={<User />}
        maxWidth="lg"
        backLink={{ href: '/game', label: 'Zpět do hry' }}
      >
        <div className="p-8 text-center text-[#d4a574]">
          Nebyla nalezena postava. Prosím vytvořte si novou postavu.
        </div>
      </PageTemplate>
    )
  }

  const character = result.character

  // Map server data to client props
  const clientProps = {
    // Note: We don't pass characterId here as it's not in clientProps,
    // but we pass it to PageTemplate for the header
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
      reputation: 0,
      gold: character.gold,
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

  return (
    <PageTemplate
      title="Hrdina"
      icon={<User />}
      maxWidth="lg"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      characterId={character.id}
    >
      <CharacterClient character={clientProps.character} inventory={clientProps.inventory} />
    </PageTemplate>
  )
}
