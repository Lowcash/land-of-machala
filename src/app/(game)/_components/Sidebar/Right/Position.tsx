'use client'

import { usePlayerQuery } from '@/data/player'

export default function Position() {
  const player = usePlayerQuery()

  return (
    <div>
      <div>x: {player.data?.pos_x}</div>
      <div>y: {player.data?.pos_y}</div>
    </div>
  )
}
