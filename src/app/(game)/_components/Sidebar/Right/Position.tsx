'use client'

import { useQuery } from '@tanstack/react-query'
import { getPlayerInfo } from '@/app/actions'

import { QUERY_KEY } from '@/const'

interface Props {
  initialData: Awaited<ReturnType<typeof getPlayerInfo>>
}

export default function Position(p: Props) {
  const playerInfoQuery = useQuery({
    queryKey: [QUERY_KEY.PLAYER_INFO],
    initialData: p.initialData,
    queryFn: () => getPlayerInfo(),
  })

  return (
    <div>
      <div>x: {playerInfoQuery.data.pos_x}</div>
      <div>y: {playerInfoQuery.data.pos_y}</div>
    </div>
  )
}
