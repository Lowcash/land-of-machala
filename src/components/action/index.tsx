'use client'

import React from 'react'
import { api } from '@/trpc/react'

import { Button } from '../button/shadcn'

export default function Action() {
  const { player, game } = api.useUtils()
  const { data } = api.game.position.useQuery()
  const attack = api.game.attack.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.position.invalidate()
    },
  })
  const runAway = api.game.runAway.useMutation({
    onSettled: () => {
      game.position.invalidate()
    }
  })

  const handleAttack = React.useCallback(() => attack.mutate(), [attack])
  const handleRunAway = React.useCallback(() => runAway.mutate(), [runAway])

  return (
    <>
      {data?.enemy && (
        <div className='flex justify-between'>
          <Button onClick={handleAttack}>Útok</Button>
          <Button onClick={handleRunAway}>Utéct</Button>
        </div>
      )}
    </>
  )
}
