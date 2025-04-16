'use client'

import { useGameInfoQuery } from '@/hooks/api/use-game'

import Enemy from '@/app/(game)/world/_components/Action/Enemy'
import Loot from '@/app/(game)/world/_components/Info/Loot'

export default function Action() {
  const gameInfoQuery = useGameInfoQuery()

  const hasEnemy = !!gameInfoQuery.data?.enemy
  const hasLoot = !!gameInfoQuery.data?.loot

  if (hasEnemy) return <Enemy />
  if (hasLoot) return <Loot />

  return <></>
}
