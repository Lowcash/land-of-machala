'use client'

import React from 'react'

import { api } from '@/trpc/react'

import * as S from './index.styles'
import { Button } from '../ui/button'

export default function Action() {
  const { player, game } = api.useUtils()
  const { data: gameInfo } = api.game.info.useQuery()
  const attack = api.game.attack.useMutation({
    onSettled: () => {
      player.info.invalidate()
      player.stats.invalidate()
      player.wearable.invalidate()
      game.info.invalidate()
    },
  })
  const runAway = api.game.runAway.useMutation({
    onSettled: () => {
      player.info.invalidate()
      player.stats.invalidate()
      player.wearable.invalidate()
      game.info.invalidate()
    },
  })
  const loot = api.game.loot.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })

  const handleAttack = React.useCallback(() => attack.mutate(), [attack])
  const handleRunAway = React.useCallback(() => runAway.mutate(), [runAway])
  const handleLoot = React.useCallback(() => loot.mutate(), [loot])

  const hasEnemy = Boolean(gameInfo?.enemyInstance)
  const hasLoot = Boolean(gameInfo?.loot)

  if (!hasEnemy && !hasLoot) return <></>

  return (
    <S.Info>
      {hasEnemy && (
        <div className='flex justify-between'>
          <Button variant='destructive' onClick={handleAttack}>
            Útok
          </Button>
          <Button variant='secondary' onClick={handleRunAway}>
            Utéct
          </Button>
        </div>
      )}
      {hasLoot && (
        <div className='flex justify-between'>
          <Button variant='destructive' onClick={handleLoot}>
            Loot
          </Button>
        </div>
      )}
    </S.Info>
  )
}
