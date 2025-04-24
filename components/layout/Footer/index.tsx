'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'

import * as S from './styles'
import Progress from '@/components/ui/progress'

export default function Footer() {
  const playerShowQuery = usePlayerShowQuery()

  const xpActual = playerShowQuery.data?.xp_actual ?? 0
  const xpMax = playerShowQuery.data?.xp_max ?? 100

  return (
    <S.Footer>
      <Progress value={xpActual} max={xpMax} variant='gold'>
        {xpActual} / {xpMax}
      </Progress>
    </S.Footer>
  )
}
