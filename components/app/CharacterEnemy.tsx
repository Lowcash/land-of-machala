'use client'

import { memo } from 'react'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'
import { Character } from '@/components/app/Character'

export const CharacterEnemy = memo(function CharacterEnemy() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  return (
    <Character
      character={{
        name: gameShowInfoQuery.data?.combat?.enemyInstance.enemy.name ?? 'enemy_name',
      }}
      abilities={{
        damage: `${gameShowInfoQuery.data?.combat?.enemyInstance.enemy.damage_from.toString() ?? 'enemy_damage_min'} - ${gameShowInfoQuery.data?.combat?.enemyInstance.enemy.damage_to.toString() ?? 'enemy_damage_max'}`,
      }}
      progress={{
        hp: {
          actual: gameShowInfoQuery.data?.combat?.enemyInstance.hp_actual ?? 0,
          max: gameShowInfoQuery.data?.combat?.enemyInstance.hp_max ?? 100,
        },
      }}
    />
  )
})
