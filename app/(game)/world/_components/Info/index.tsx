'use client'

import { loc } from '@/lib/localization'
import { useGameInfoQuery } from '@/hooks/api/use-game'

import { Card } from '@/styles/common'
import Defeated from '@/app/(game)/world/_components/Info/Defeated'
import Loot from '@/app/(game)/world/_components/Info/Loot'
import Enemy from '@/app/(game)/world/_components/Info/Enemy'
import Place from '@/app/(game)/world/_components/Info/Place'

export default function Info() {
  const gameInfoQuery = useGameInfoQuery()

  const hasEnemy = !!gameInfoQuery.data?.enemy
  const hasPlace = !!gameInfoQuery.data?.place
  const hasLoot = !!gameInfoQuery.data?.loot

  const isDefeated = !!gameInfoQuery.data?.defeated

  if (isDefeated) return <Defeated />

  if (hasLoot) return <Loot />
  if (hasEnemy) return <Enemy />

  if (hasPlace)
    return (
      <Card>
        <Place />
      </Card>
    )

  return <Card>{loc.world.explore}</Card>
}