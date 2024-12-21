'use client'

import { loc } from '@/local'
import { usePlayerQuery } from '@/hooks/api/usePlayer'

import * as S from './styles'
import { Text } from '@/styles/text-server'

export default function Position() {
  const player = usePlayerQuery()

  return (
    <S.Position>
      <div>
        <Text>{loc.common.coord_x}:</Text> <Text light>{player.data?.pos_x}</Text>
      </div>
      <div>
        <Text>{loc.common.coord_y}:</Text> <Text light>{player.data?.pos_y}</Text>
      </div>
    </S.Position>
  )
}
