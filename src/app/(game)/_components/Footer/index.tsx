'use client'

import React from 'react'
import { usePlayerQuery } from '@/hooks/api/usePlayer'

import * as S from './index.styles'
import Progress from '@/components/ui/progress'

export default function Footer() {
  const playerQuery = usePlayerQuery()

  return (
    <S.Footer>
      <Progress value={playerQuery.data?.xp_actual} max={playerQuery.data?.xp_max ?? 0} $variant='gold'>
        {playerQuery.data?.xp_actual ?? 0} / {playerQuery.data?.xp_max ?? 0}
      </Progress>
    </S.Footer>
  )
}
