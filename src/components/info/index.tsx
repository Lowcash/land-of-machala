'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'

export default function Info() {
  const { data } = api.game.position.useQuery()

  return (
    <S.Info
      dangerouslySetInnerHTML={{
        __html:
          data?.place?.name ??
          (data?.enemy ? `${data.enemy.name} (${data.enemy.hp_actual}/${data.enemy.hp_max})` : '&nbsp;'),
      }}
    />
  )
}
