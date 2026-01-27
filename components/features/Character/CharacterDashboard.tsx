import { CharacterBox } from '@/components/features/Game'
import { GameGrid } from '@/components/ui/game-grid'

import { AchievementList } from './Achievements/AchievementList'
import { EquipmentList } from './Equipment/EquipmentList'
import { StatsPanel } from './Profile/StatsPanel'
import type { CharacterData, CharacterItem } from './Shared/types'
import { calculateDerivedStats, enrichAchievements } from './Shared/utils'

interface CharacterDashboardProps {
  character: CharacterData
  inventory: CharacterItem[]
}

export function CharacterDashboard({ character, inventory }: CharacterDashboardProps) {
  const equipped = inventory.filter((item) => item.equipped)
  const stats = calculateDerivedStats(character, inventory)
  const achievements = enrichAchievements(character.achievements)

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

      <GameGrid columns={{ default: 1, md: 2, lg: 3 }} containerClassName="h-full" className="pb-4">
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
      </GameGrid>
    </div>
  )
}
