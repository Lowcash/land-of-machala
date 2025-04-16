'use client'

import { usePlayerQuery } from '@/hooks/api/use-player'

import * as S from './styles'
import Progress from '@/components/ui/progress'

export default function Footer() {
  const playerQuery = usePlayerQuery()

  const xpActual = playerQuery.data?.xp_actual ?? 0
  const xpMax = playerQuery.data?.xp_max ?? 100

  return (
    <S.Footer>
      <Progress value={xpActual} max={xpMax} variant='gold'>
        {xpActual} / {xpMax}
      </Progress>
    </S.Footer>
  )
}
