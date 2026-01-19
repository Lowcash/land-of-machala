'use client'

import { CharacterBox } from '@/components/features/Game/CharacterBox'
import { PageHeaderWithBack } from '@/components/ui/PageHeaderWithBack'
import { CharacterDetailContent } from './CharacterDetailContent'
import type { CharacterData, CharacterItem } from './types'

interface CharacterClientProps {
  character: CharacterData
  inventory: CharacterItem[]
}

export function CharacterClient({ character, inventory }: CharacterClientProps) {
  const equipped = inventory.filter((item) => item.equipped)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeaderWithBack href="/game" label="Zpět do hry" />
      
      <div className="flex-1 overflow-y-auto md:p-3">
        <div className="mx-auto w-full max-w-6xl space-y-3">
          {/* Mobile: Sticky Character Box */}
          <div className="sticky top-0 z-20 w-full bg-black/80 px-4 py-2 backdrop-blur-sm md:hidden md:static md:bg-transparent md:p-0">
            <CharacterBox
              name={character.name}
              level={character.level}
              hp={character.hp}
              hpMax={character.maxHp}
              mana={character.mana}
              manaMax={character.maxMana}
              xp={character.experience}
              xpMax={1000}
              stats={{
                strength: character.strength,
                intelligence: character.intelligence,
                agility: character.agility,
                stamina: character.stamina,
              }}
              isEnemy={false}
            />
          </div>

          {/* Desktop: First Row - CharacterBox + Stats/Resistances */}
          <div className="hidden grid-cols-2 gap-4 md:grid">
            <div>
              <CharacterBox
                name={character.name}
                level={character.level}
                hp={character.hp}
                hpMax={character.maxHp}
                mana={character.mana}
                manaMax={character.maxMana}
                xp={character.experience}
                xpMax={1000}
                stats={{
                  strength: character.strength,
                  intelligence: character.intelligence,
                  agility: character.agility,
                  stamina: character.stamina,
                }}
                isEnemy={false}
              />
            </div>
            <div>
              <CharacterDetailContent section="stats" character={character} equipped={equipped} />
            </div>
          </div>

          {/* Mobile: Stats Section */}
          <div className="px-4 md:px-0">
            <CharacterDetailContent section="stats" character={character} equipped={equipped} />
          </div>

          {/* Second Row - Equipment + Achievements */}
          <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-0">
            <div>
              <CharacterDetailContent section="equipment" character={character} equipped={equipped} />
            </div>
            <div>
              <CharacterDetailContent
                section="achievements"
                character={character}
                equipped={equipped}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
