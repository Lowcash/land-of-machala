'use client'

import { useAttackMutation, useRunAwayMutation } from '@/data/game'

import { Button } from '@/components/ui/button'

export default function Enemy() {
  const attackMutation = useAttackMutation()
  const runAwayMutation = useRunAwayMutation()

  const handleAttack = () => attackMutation.mutate()
  const handleRunAway = () => runAwayMutation.mutate()

  return (
    <>
      <Button variant='destructive' onClick={handleAttack}>
        Útok
      </Button>
      <Button variant='secondary' onClick={handleRunAway}>
        Utéct
      </Button>
    </>
  )
}
