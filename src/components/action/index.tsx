'use client'

import React from 'react'
import { api } from '@/trpc/react'

import { Button } from '../button/shadcn'

export default function Action() {
  const { player, game } = api.useUtils()
  const { data: gameInfo } = api.game.info.useQuery()
  const attack = api.game.attack.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })
  const runAway = api.game.runAway.useMutation({
    onSettled: () => {
      game.info.invalidate()
    },
  })

  const handleAttack = React.useCallback(() => attack.mutate(), [attack])
  const handleRunAway = React.useCallback(() => runAway.mutate(), [runAway])

  return (
    <>
      {gameInfo?.enemyInstance && (
        <div className='flex justify-between'>
          <Button onClick={handleAttack}>Útok</Button>
          <Button onClick={handleRunAway}>Utéct</Button>
        </div>
      )}
    </>
  )
}
