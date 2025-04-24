'use client'

import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import Enemy from '@/app/(game)/world/_components/Action/Enemy'
import Loot from '@/app/(game)/world/_components/Action/Loot'

export default function Action() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  if (gameShowInfoQuery.derived.hasCombat) return <Enemy />
  if (gameShowInfoQuery.derived.hasLoot) return <Loot />

  return <></>
}
