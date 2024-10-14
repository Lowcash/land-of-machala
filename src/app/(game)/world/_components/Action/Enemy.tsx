'use client'

import { useAttackMutation, useGameInfoQuery, useRunAwayMutation } from '@/hooks/api/useGame'

import * as S from './index.styles'
import { Button } from '@/components/ui/button'

export default function Enemy() {
  const gameInfo = useGameInfoQuery()

  const attackMutation = useAttackMutation()
  const runAwayMutation = useRunAwayMutation()

  const handleAttack = () => attackMutation.mutate()
  const handleRunAway = () => runAwayMutation.mutate()

  // @ts-ignore
  if (!gameInfo.data?.enemy) return <></>

  return (
    <S.Action>
      <Button variant='destructive' onClick={handleAttack}>
        Útok
      </Button>
      <Button variant='secondary' onClick={handleRunAway}>
        Utéct
      </Button>
    </S.Action>
  )
}
