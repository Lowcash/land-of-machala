'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'

export default function Info() {
  const { data: gameInfo } = api.game.info.useQuery()

  console.log(gameInfo)

  return (
    <S.Info
      dangerouslySetInnerHTML={{
        __html:
          gameInfo?.loot ??
          gameInfo?.place?.name ??
          (gameInfo?.enemy
            ? `${gameInfo.enemy.name} (${gameInfo.enemy.hp_actual}/${gameInfo.enemy.hp_max})`
            : '&nbsp;'),
      }}
    />
  )
}
