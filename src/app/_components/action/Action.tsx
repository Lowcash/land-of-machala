'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { AppRouter } from '@/server/api/root'
import { inferProcedureOutput } from '@trpc/server'

import * as S from './Action.styles'
import { Button } from '@/components/ui/button'

interface Props {
  data: inferProcedureOutput<AppRouter['game']['info']>
}

export default function Action(p: Props) {
  const { player, game } = api.useUtils()

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

  const hasEnemy = Boolean(p.data.enemyInstance)
  const hasLoot = Boolean(p.data.loot)

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
