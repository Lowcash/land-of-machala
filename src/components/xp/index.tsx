'use client'

import { api } from '~/trpc/react'

import * as S from './index.styles'
// import Progress from '../progress'

export default function XP() {
  const { data: player } = api.player.info.useQuery()

  return (
    <S.XP>
      {/* <Progress value={((player?.mana_actual ?? 0) / (player?.mana_max ?? 0)) * 100} theme={'orange'}>
        {player?.xp_actual ?? 0} / {player?.xp_max ?? 0}
      </Progress> */}
    </S.XP>
  )
}
