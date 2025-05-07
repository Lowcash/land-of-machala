'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'
import Character from '@/components/app/Character'

export default function CharacterPlayer() {
  const playerShowQuery = usePlayerShowQuery()

  return (
    <Character
      character={{
        name: playerShowQuery.data?.name ?? 'player_name',
        level: playerShowQuery.data?.text.level ?? 'player_level',
        race: playerShowQuery.data?.race.name ?? 'player_race',
        class: playerShowQuery.data?.class.name ?? 'player_class',
      }}
      abilities={{
        strength: playerShowQuery.data?.strength.toString() ?? 'player_strength',
        agility: playerShowQuery.data?.agility.toString() ?? 'player_agility',
        intelligence: playerShowQuery.data?.intelligence.toString() ?? 'player_intelligence',
        armor: playerShowQuery.data?.armor.toString() ?? 'player_armor',
        damage: `${playerShowQuery.data?.damage_min.toString() ?? 'player_damage_min'} - ${playerShowQuery.data?.damage_max.toString() ?? 'player_damage_max'}`,
      }}
      progress={{
        hp: {
          actual: playerShowQuery.data?.hp_actual ?? 0,
          max: playerShowQuery.data?.hp_max ?? 100,
        },
        mana: {
          actual: playerShowQuery.data?.mana_actual ?? 0,
          max: playerShowQuery.data?.mana_max ?? 100,
        },
        xp: {
          actual: playerShowQuery.data?.xp_actual ?? 0,
          max: playerShowQuery.data?.xp_max ?? 100,
        },
      }}
    />
  )
}
