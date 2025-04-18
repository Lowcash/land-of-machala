'use client'

import i18n from '@/lib/i18n'
import { usePlayerShowQuery } from '@/hooks/api/use-player'

import * as S from './styles'
import { Text } from '@/styles/typography'

export default function Position() {
  const player = usePlayerShowQuery()

  return (
    <S.Position>
      <span>
        <Text>{i18n.t('common.coord_x')}:</Text> <Text light>{player.data?.pos_x}</Text>
      </span>
      <span>
        <Text>{i18n.t('common.coord_y')}:</Text> <Text light>{player.data?.pos_y}</Text>
      </span>
    </S.Position>
  )
}
