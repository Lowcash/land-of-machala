'use client'

import { api } from '~/trpc/react'

import * as S from './index.styles'
import Progress from '../progress'

export default function XP() {
  const { data: player } = api.player.info.useQuery()

  return (
    <S.XP>
      <div style={{ width: 200 }}>
        <Progress value={((player?.mana_actual ?? 0) / (player?.mana_max ?? 0)) * 100}>
          {player?.xp_actual ?? 0} / {player?.xp_max ?? 0}
        </Progress>
      </div>
    </S.XP>
  )
}
