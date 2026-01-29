import type { Achievement, CharacterData, CharacterItem } from '@/lib/types/game'

import { CharacterBox } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'

import { AchievementList } from './Achievements/AchievementList'
import { EquipmentList } from './Equipment/EquipmentList'
import { StatsPanel } from './Profile/StatsPanel'
import { calculateDerivedStats } from './Shared/utils'

interface CharacterDashboardProps {
  character: CharacterData
  inventory: CharacterItem[]
  achievements: Achievement[]
}

export function CharacterDashboard({
  character,
  inventory,
  achievements,
}: CharacterDashboardProps) {
  const equipped = inventory.filter((item) => item.equipped)
  const stats = calculateDerivedStats(character, inventory)

  return (
    <div className="h-full">
      <SplitLayout
        asideWidth="lg"
        main={
          <div className="flex flex-col gap-6 p-4">
            {/* Character Summary */}
            <CharacterBox
              name={character.name}
              level={character.level}
              hp={character.hp}
              hpMax={character.maxHp}
              mana={character.mana}
              manaMax={character.maxMana}
              xp={character.experience}
              xpMax={1000}
              isEnemy={false}
              gold={character.gold}
            />

            {/* Equipment */}
            <EquipmentList equipped={equipped} />

            {/* Achievements */}
            <AchievementList achievements={achievements} />
          </div>
        }
        aside={
          <StatsPanel
            character={character}
            totalAttack={stats.totalAttack}
            totalDefense={stats.totalDefense}
          />
        }
      />
    </div>
  )
}
