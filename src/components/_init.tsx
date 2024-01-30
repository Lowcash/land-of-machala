'use client'

import { api } from '~/trpc/react'

export default function _Init() {
  api.game.init.useQuery()

  return <></>
}
