'use client'

import { usePlayerQuery } from '@/hooks/api/usePlayer'

import * as S from './styles'
import Progress from '@/components/ui/Progress'

export default function Footer() {
  const playerQuery = usePlayerQuery()

  return (
    <S.Footer>
      <Progress value={playerQuery.data?.xp_actual ?? 0} max={playerQuery.data?.xp_max ?? 0} variant='gold'>
        {playerQuery.data?.xp_actual ?? 0} / {playerQuery.data?.xp_max ?? 0}
      </Progress>
    </S.Footer>
  )
}
