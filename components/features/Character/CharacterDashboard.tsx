import type { Achievement, CharacterData, CharacterItem } from '@/lib/types/game'

import { CharacterBox } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { VStack } from '@/components/ui/stack'

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
    <VStack fullHeight>
      <SplitLayout
        asideWidth="lg"
        main={
          <VStack p="md" fullHeight>
            <VStack gap="lg">
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
            </VStack>
          </VStack>
        }
        aside={
          <VStack fullHeight overflow="scroll" p="md">
            <StatsPanel
              character={character}
              totalAttack={stats.totalAttack}
              totalDefense={stats.totalDefense}
            />
          </VStack>
        }
      />
    </VStack>
  )
}
