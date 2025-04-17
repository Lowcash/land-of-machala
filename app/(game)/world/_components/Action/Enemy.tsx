'use client'

import i18next from '@/lib/i18n'
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
        {i18next.t('enemy.attack')}
      </Button>
      <Button variant='secondary' onClick={handleRunAway}>
        {i18next.t('enemy.run_away')}
      </Button>
    </S.Action>
  )
}
