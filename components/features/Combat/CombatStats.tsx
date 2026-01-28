import type { CharacterData } from '@/lib/types/game'

import { CharacterBox } from '@/components/features/Game'

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
}

export function CombatStats({ character, playerHp, playerMana, enemy, enemyHp }: CombatStatsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 px-3 pt-3 md:grid-cols-2">
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
    </div>
  )
}
