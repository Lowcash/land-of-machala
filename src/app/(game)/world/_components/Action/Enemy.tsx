'use client'

import { loc } from '@/local'
import { useAttackMutation, useInfoQuery, useRunAwayMutation } from '@/hooks/api/useGame'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Enemy() {
  const gameInfo = useInfoQuery()

  const attackMutation = useAttackMutation()
  const runAwayMutation = useRunAwayMutation()

  const handleAttack = () => attackMutation.mutate()
  const handleRunAway = () => runAwayMutation.mutate()

  if (!gameInfo.data?.enemy) return <></>

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleAttack}>
        {loc.enemy.attack}
      </Button>
      <Button variant='secondary' onClick={handleRunAway}>
        {loc.enemy.run_away}
      </Button>
    </S.Action>
  )
}
