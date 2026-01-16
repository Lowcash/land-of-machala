'use client'

import { CharacterBox } from '@/components/features/Game/CharacterBox'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CharacterDetailContent } from './CharacterDetailContent'
import type { CharacterData, CharacterItem } from './types'

interface CharacterClientProps {
  character: CharacterData
  inventory: CharacterItem[]
}

export function CharacterClient({ character, inventory }: CharacterClientProps) {
  const equipped = inventory.filter((item) => item.equipped)

  return (
    <div className="flex h-full flex-col overflow-y-auto md:px-3">
      <div className="mx-auto w-full max-w-6xl space-y-3">
        {/* Sticky Back Navigation */}
        <div className="sticky top-0 z-30 m-0 border-b border-[#8b6f47] bg-black/95 px-4 py-3 backdrop-blur-sm">
          <Link
            href="/game"
            className="inline-flex items-center gap-2 text-sm text-[#d4a574] transition-colors hover:text-[#ffd700]"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět do hry
          </Link>
        </div>

        <div className="space-y-3 p-2 md:p-4">
          {/* Mobile: Sticky Character Box */}
          <div className="sticky top-14.25 z-10 w-full md:hidden">
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
          <div className="md:hidden">
            <CharacterDetailContent section="stats" character={character} equipped={equipped} />
          </div>

          {/* Second Row - Equipment + Achievements */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <CharacterDetailContent
                section="equipment"
                character={character}
                equipped={equipped}
              />
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
