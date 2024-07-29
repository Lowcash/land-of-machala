'use client'

import React from 'react'
import { api } from '@/trpc/react'

import { Card } from '@/styles/common'
import { Button } from '@/components/ui/button'

export default function Action() {
  const utils = api.useUtils()

  const infoQuery = api.game.info.useQuery()

  const attackMutation = api.game.attack.useMutation({
    onSettled: () => {
      utils.player.info.invalidate()
      utils.player.stats.invalidate()
      utils.player.wearable.invalidate()
      utils.game.info.invalidate()
    },
  })
  const runAwayMutation = api.game.runAway.useMutation({
    onSettled: () => {
      utils.player.info.invalidate()
      utils.player.stats.invalidate()
      utils.player.wearable.invalidate()
      utils.game.info.invalidate()
    },
  })
  const lootMutation = api.game.loot.useMutation({
    onSettled: () => {
      utils.player.info.invalidate()
      utils.game.info.invalidate()
    },
  })

  const handleAttack = () => attackMutation.mutate()
  const handleRunAway = () => runAwayMutation.mutate()
  const handleLoot = () => lootMutation.mutate()

  const hasEnemy = !!infoQuery?.data?.enemyInstance
  const hasLoot = !!infoQuery?.data?.loot

  if (!hasEnemy && !hasLoot) return <></>

  return (
    <Card>
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
    </Card>
  )
}
