'use client'

import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import { Card } from '@/styles/common'
import Enemy from '@/app/(game)/world/_components/Action/Enemy'
import Loot from '@/app/(game)/world/_components/Action/Loot'
import Move from '@/components/button/Move'

export default function Action() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  return (
    <div className='flex w-full flex-col gap-2'>
      {/* {(gameShowInfoQuery.derived.hasCombat || gameShowInfoQuery.derived.hasLoot) && (
        <Card>
          {gameShowInfoQuery.derived.hasCombat ? <Enemy /> : gameShowInfoQuery.derived.hasLoot ? <Loot /> : <></>}
        </Card>
      )} */}
      <Card>
        <Move />
      </Card>
    </div>
  )
}
