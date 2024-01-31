'use client'

import { api } from '~/trpc/react'

import * as S from './index.styles'

export default function Info() {
  const { data } = api.game.position.useQuery()

  return <S.Info dangerouslySetInnerHTML={{ __html: data?.place?.name ?? data?.enemy?.name ?? '&nbsp;' }} />
}
