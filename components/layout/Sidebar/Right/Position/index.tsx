'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'

import * as S from './styles'
import { Text } from '@/styles/typography'

import { EMPTY } from '@/config'

export default function Position() {
  const playerShowQuery = usePlayerShowQuery()

  return (
    <S.Position>
      <span>
        <Text>{playerShowQuery.data?.text.pos_x ?? 'pos_x'}:</Text>{' '}
        <Text light>{playerShowQuery.data?.pos_x ?? EMPTY}</Text>
      </span>
      <span>
        <Text>{playerShowQuery.data?.text.pos_y ?? 'pos_y'}:</Text>{' '}
        <Text light>{playerShowQuery.data?.pos_y ?? EMPTY}</Text>
      </span>
    </S.Position>
  )
}
