'use client'

import { api } from '~/trpc/react'

export default function Info() {
  const { data } = api.game.position.useQuery()

  return <>{data?.place?.name ?? data?.enemy?.name}</>
}
