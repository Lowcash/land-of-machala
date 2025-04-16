'use client'

import { loc } from '@/lib/localization'
import { useGameAttackMutation, useGameRunAwayMutation } from '@/hooks/api/use-game'

import * as S from './styles'
import { Button } from '@/components/ui/button'

export default function Enemy() {
  const attackMutation = useGameAttackMutation()
  const runAwayMutation = useGameRunAwayMutation()

  const handleAttack = () => attackMutation.mutate()
  const handleRunAway = () => runAwayMutation.mutate()

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
