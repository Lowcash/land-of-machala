'use client'

import { loc } from '@/lib/localization'
import { usePlayerQuery } from '@/hooks/api/use-player'

import * as S from './styles'
import { Text } from '@/styles/typography'

export default function Position() {
  const player = usePlayerQuery()

  return (
    <S.Position>
      <span>
        <Text>{loc.common.coord_x}:</Text> <Text light>{player.data?.pos_x}</Text>
      </span>
      <span>
        <Text>{loc.common.coord_y}:</Text> <Text light>{player.data?.pos_y}</Text>
      </span>
    </S.Position>
  )
}
