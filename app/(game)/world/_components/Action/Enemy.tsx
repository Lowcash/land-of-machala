'use client'

import { useGameAttackMutation, useGameInfoShowQuery, useGameRunAwayMutation } from '@/hooks/api/use-game'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Enemy() {
  const gameInfoShowQuery = useGameInfoShowQuery()

  const attackMutation = useGameAttackMutation()
  const runAwayMutation = useGameRunAwayMutation()

  const handleAttack = () => attackMutation.mutate()
  const handleRunAway = () => runAwayMutation.mutate()

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleAttack}>
        {gameInfoShowQuery.data?.text?.attack ?? 'game_attack'}
      </Button>
      <Button variant='secondary' onClick={handleRunAway}>
        {gameInfoShowQuery.data?.text?.runAway ?? 'game_run_away'}
      </Button>
    </S.Action>
  )
}
