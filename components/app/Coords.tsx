'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'

import { Text } from '@/styles/typography'

export default function Coords() {
  const playerShowQuery = usePlayerShowQuery()

  return (
    <div className='flex gap-1'>
      <span>
        <Text bold size='large'>
          {playerShowQuery.data?.text.pos_x ?? 'pos_x'}:
        </Text>
        &nbsp;
        <Text bold size='large' light>
          {playerShowQuery.data?.pos_x ?? 'player_pos_x'}
        </Text>
      </span>
      <span>
        <Text bold size='large'>
          {playerShowQuery.data?.text.pos_y ?? 'pos_y'}:
        </Text>
        &nbsp;
        <Text bold size='large' light>
          {playerShowQuery.data?.pos_y ?? 'player_pos_y'}
        </Text>
      </span>
    </div>
  )
}
