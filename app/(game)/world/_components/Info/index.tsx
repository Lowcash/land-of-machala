'use client'

import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import { Card } from '@/styles/common'
import Defeated from '@/app/(game)/world/_components/Info/Defeated'
import Loot from '@/app/(game)/world/_components/Info/Loot'
import Enemy from '@/app/(game)/world/_components/Info/Enemy'
import Place from '@/app/(game)/world/_components/Info/Place'

export default function Info() {
  const gameInfoShowQuery = useGameInfoShowQuery()

  const hasEnemy = !!gameInfoShowQuery.data?.enemy
  const hasPlace = !!gameInfoShowQuery.data?.place
  const hasLoot = !!gameInfoShowQuery.data?.loot

  const isDefeated = !!gameInfoShowQuery.data?.defeated

  if (isDefeated) return <Defeated />

  if (hasLoot) return <Loot />
  if (hasEnemy) return <Enemy />

  if (hasPlace)
    return (
      <Card>
        <Place />
      </Card>
    )

  return <Card>{gameInfoShowQuery.data?.text?.worldExplore ?? 'game_world_eplore'}</Card>
}
