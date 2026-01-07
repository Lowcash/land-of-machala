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
    <div className="flex h-full flex-col overflow-y-auto p-2 md:p-3">
      <div className="mx-auto w-full max-w-6xl space-y-3">
        {/* Back to game link */}
        <Link
          href="/game"
          className="inline-flex items-center gap-2 text-sm text-[#d4a574] transition-colors hover:text-[#ffd700]"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět do hry
        </Link>
        
        {/* Character Visual - Full Width */}
        <div className="w-full">
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
        
        {/* Content Grid - 2 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left Column: Stats */}
          <div>
            <CharacterDetailContent section="stats" character={character} equipped={equipped} />
          </div>
          
          {/* Right Column: Equipment */}
          <div>
            <CharacterDetailContent section="equipment" character={character} equipped={equipped} />
          </div>
        </div>
        
        {/* Achievements - Full Width */}
        <div>
          <CharacterDetailContent
            section="achievements"
            character={character}
            equipped={equipped}
          />
        </div>
      </div>
    </div>
  )
}

