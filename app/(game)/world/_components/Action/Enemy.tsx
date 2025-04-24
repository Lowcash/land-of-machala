'use client'

import { useGameAttackMutation, useGameShowInfoQuery, useGameRunAwayMutation } from '@/hooks/api/use-game'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Enemy() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  const attackMutation = useGameAttackMutation()
  const runAwayMutation = useGameRunAwayMutation()

  const handleAttack = () => attackMutation.mutate()
  const handleRunAway = () => runAwayMutation.mutate()

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleAttack}>
        {gameShowInfoQuery.data?.combat?.text?.attack ?? 'game_attack'}
      </Button>
      <Button variant='secondary' onClick={handleRunAway}>
        {gameShowInfoQuery.data?.combat?.text?.runAway ?? 'game_run_away'}
      </Button>
    </S.Action>
  )
}
