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
  // 4. Sub-components (Render helpers)
  const FloatingFeedback = ({ type, isEnemy }: { type: string; isEnemy: boolean }) => {
    const isActive = effects.includes(`${isEnemy ? 'enemy' : 'player'}-${type}`)
    if (!isActive) return null

    const config = {
      crit: { text: 'KRIT!', color: 'text-yellow-400' },
      dodge: { text: 'ÚHYB!', color: 'text-blue-400' },
    }

    const { text, color } = config[type as keyof typeof config] || {
      text: type,
      color: 'text-white',
    }

    return (
      <div
        className={`pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 animate-bounce font-black tracking-tighter shadow-black drop-shadow-md ${color}`}
        style={{ fontFamily: 'var(--font-fantasy)', fontSize: '1.5rem' }}
      >
        {text}
      </div>
    )
  }

  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <div className="relative">
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
        <FloatingFeedback type="crit" isEnemy={false} />
        <FloatingFeedback type="dodge" isEnemy={false} />
      </div>

      <div className="relative">
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
        <FloatingFeedback type="crit" isEnemy={true} />
        <FloatingFeedback type="dodge" isEnemy={true} />
      </div>
    </div>
  )
}
