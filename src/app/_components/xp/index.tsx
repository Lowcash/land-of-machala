'use client'

import { api } from '~/trpc/react'

import * as S from './index.styles'

export default function XP() {
  const { data } = api.game.position.useQuery()

  return <S.XP dangerouslySetInnerHTML={{ __html: data?.place?.name ?? data?.enemy?.name ?? '&nbsp;' }} />
}
