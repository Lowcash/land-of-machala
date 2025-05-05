'use client'

import { useGameShowInfoQuery } from '@/hooks/api/use-game'
import { usePlayerShowQuery } from '@/hooks/api/use-player'

import { Card } from '@/styles/common'
import Enemy from '@/app/(game)/world/_components/Action/Enemy'
import Loot from '@/app/(game)/world/_components/Action/Loot'
import Move from '@/components/button/Move'
import { Text } from '@/styles/typography'

export default function Action() {
  const gameShowInfoQuery = useGameShowInfoQuery()
  const playerShowQuery = usePlayerShowQuery()

  const hasCityMain = gameShowInfoQuery.data?.place?.id === 'main_city'

  return (
    <div className='flex w-full flex-col gap-2'>
      {/* {(gameShowInfoQuery.derived.hasLoot || (!hasCityMain && !gameShowInfoQuery.derived.hasCombat)) && ( */}
      {(gameShowInfoQuery.derived.hasLoot || (!hasCityMain && !gameShowInfoQuery.derived.hasCombat)) && (
        <>
          <Card className='p-0'>
            {gameShowInfoQuery.derived.hasLoot ? (
              <Loot />
            ) : !hasCityMain && !gameShowInfoQuery.derived.hasCombat ? (
              <Move />
            ) : (
              <></>
            )}
            {/* <Move /> */}
          </Card>
        </>
      )}
      <Card className='relative'>
        <div className='absolute left-2/4 top-2/4 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-1'>
          <span>
            <Text bold size='large'>
              {playerShowQuery.data?.text.pos_x ?? 'pos_x'}:
            </Text>{' '}
            <Text bold size='large' light>
              {playerShowQuery.data?.pos_x ?? 'player_pos_x'}
            </Text>
          </span>
          <span>
            <Text bold size='large'>
              {playerShowQuery.data?.text.pos_y ?? 'pos_y'}:
            </Text>{' '}
            <Text bold size='large' light>
              {playerShowQuery.data?.pos_y ?? 'player_pos_y'}
            </Text>
          </span>
        </div>
      </Card>
      {/* )} */}
    </div>
  )
}
