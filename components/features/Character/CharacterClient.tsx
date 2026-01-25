'use client'

import { CharacterBox } from '@/components/features/Game'
import { ACHIEVEMENTS } from '@/lib/game/data'
import type { LucideIcon} from 'lucide-react';
import { Coins, MapPin, Shield, Swords, Trophy } from 'lucide-react'
import { AchievementList } from './Achievements/AchievementList'
import { EquipmentList } from './Equipment/EquipmentList'
import { StatsPanel } from './Profile/StatsPanel'
import type { CharacterData, CharacterItem } from './Shared/types'
import { calculateDerivedStats } from './Shared/utils'

interface CharacterClientProps {
  character: CharacterData
  inventory: CharacterItem[]
}

export function CharacterClient({ character, inventory }: CharacterClientProps) {
  const equipped = inventory.filter((item) => item.equipped)
  const stats = calculateDerivedStats(character, inventory)

  // Enrich achievements with UI metadata
  // TODO: Move icon mapping to a centralized config once we have server-side achievement tracking
  const ACHIEVEMENT_ICONS: Record<number, LucideIcon> = {
    1: Trophy,
    2: Trophy,
    3: MapPin,
    4: Coins,
    5: Shield,
    6: Swords,
  }

  const achievements = ACHIEVEMENTS.map((ach) => ({
    id: ach.id,
    name: ach.name,
    description: ach.desc,
    icon: ACHIEVEMENT_ICONS[ach.id] || Trophy,
    unlocked: ach.id === 1, // TODO: Get actual unlocked status from server
  }))

  return (
    <div className="mx-auto w-full max-w-7xl space-y-3 pb-4 md:p-3">
      {/* Mobile: Sticky Character Box */}
      <div className="sticky top-0 z-20 w-full bg-black/80 px-4 py-2 backdrop-blur-sm md:hidden">
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
          gold={character.gold}
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Left Column: Character Box (Desktop) + Stats */}
        <div className="flex h-full flex-col gap-4">
          <div className="hidden shrink-0 md:block">
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
              gold={character.gold}
            />
          </div>
          <div className="min-h-0 flex-1 px-4 md:px-0">
            <StatsPanel
              character={character}
              totalAttack={stats.totalAttack}
              totalDefense={stats.totalDefense}
            />
          </div>
        </div>

        {/* Middle Column: Equipment */}
        <div className="h-full px-4 md:px-0">
          <EquipmentList equipped={equipped} />
        </div>

        {/* Right Column: Achievements */}
        <div className="h-full px-4 md:px-0">
          <AchievementList achievements={achievements} />
        </div>
      </div>
    </div>
  )
}
