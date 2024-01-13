"use client"

import { api } from '~/trpc/react'

export default function Location() {
  api.game.init.useQuery()
  const { data } = api.game.checkPlace.useQuery()

  return <>{data?.name}</>
}
