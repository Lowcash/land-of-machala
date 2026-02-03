import type { CharacterData } from '@/lib/types/game'

import { CharacterBox } from '@/components/features/Game'
import { GameFeedback } from '@/components/ui/display'
import { GameGrid } from '@/components/ui/game-grid'
import { VStack } from '@/components/ui/stack'

interface CombatStatsProps {
  character: CharacterData
  playerHp: number
  playerMana: number
  enemy: {
    name: string
    level: number
    maxHp: number
    [key: string]: unknown
  }
  enemyHp: number
  effects: string[]
}

export function CombatStats({
  character,
  playerHp,
  playerMana,
  enemy,
  enemyHp,
  effects,
}: CombatStatsProps) {
  return (
    <GameGrid columns={{ default: 1, md: 2 }} fullHeight={false}>
      <VStack position="relative">
        <CharacterBox
          name={character.name}
          level={character.level}
          hp={playerHp ?? character.hp}
          hpMax={character.maxHp}
          mana={playerMana}
          manaMax={character.maxMana}
          stats={{
            strength: character.strength,
            intelligence: character.intelligence,
            agility: character.agility,
            stamina: character.stamina,
          }}
          isEnemy={false}
        />
        <GameFeedback type="crit" active={effects.includes('player-crit')} />
        <GameFeedback type="dodge" active={effects.includes('player-dodge')} />
      </VStack>

      <VStack position="relative">
        <CharacterBox
          name={enemy.name}
          level={enemy.level}
          hp={enemyHp ?? 100}
          hpMax={enemy.maxHp}
          mana={0}
          manaMax={100}
          stats={{
            strength: character.strength,
            intelligence: character.intelligence,
            agility: character.agility,
            stamina: 5,
          }}
          isEnemy={true}
          image="/assets/enemies/wolf.png"
        />
        <GameFeedback type="crit" active={effects.includes('enemy-crit')} />
        <GameFeedback type="dodge" active={effects.includes('enemy-dodge')} />
      </VStack>
    </GameGrid>
  )
}
