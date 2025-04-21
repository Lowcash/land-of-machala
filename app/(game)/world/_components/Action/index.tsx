'use client'

import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import Enemy from '@/app/(game)/world/_components/Action/Enemy'
import Loot from '@/app/(game)/world/_components/Action/Loot'

export default function Action() {
  const gameInfoShowQuery = useGameInfoShowQuery()

  if (gameInfoShowQuery.derived.hasCombat) return <Enemy />
  if (gameInfoShowQuery.derived.hasLoot) return <Loot />

  return <></>
}
