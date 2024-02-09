'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'
import Progress from '../progress'

export default function XP() {
  const { data: player } = api.player.info.useQuery()

  return (
    <S.XP>
      <Progress value={player?.xp_actual} max={player?.xp_max} color={'gold'}>
        {player?.xp_actual ?? 0} / {player?.xp_max ?? 0}
      </Progress>
    </S.XP>
  )
}
