'use client'

import { api } from '@/server/react'

import * as S from './index.styles'
import Progress from '../progress'

export default function XP() {
  const { data: player } = api.player.info.useQuery()

  return (
    <S.XP>
      <Progress value={player?.xp_actual} max={player?.xp_max ?? 0} color={'gold'}>
        {player?.xp_actual ?? 0} / {player?.xp_max ?? 0}
      </Progress>
    </S.XP>
  )
}
