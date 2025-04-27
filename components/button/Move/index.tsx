'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'

import { Text } from '@/styles/typography'
import Button from '@/components/button/Move/Button'

export default function Move() {
  const playerShowQuery = usePlayerShowQuery()

  return (
    <div className='relative flex h-44 w-full items-center justify-center gap-2 [&>*]:absolute'>
      <Button direction='up' className='-mt-28 h-14 w-24' />
      <Button direction='down' className='-mb-28 h-14 w-24' />
      <Button direction='left' className='-ml-48 h-20 w-16' />
      <Button direction='right' className='-mr-48 h-20 w-16' />
      <div className='left-2/4 top-2/4 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-1'>
        <span>
          <Text bold size='large'>
            {playerShowQuery.data?.text.pos_x ?? 'pos_x'}:
          </Text>{' '}
          <Text bold size='large' light>
            {playerShowQuery.data?.pos_x ?? 'player_pos_x'}
          </Text>
        </span>
        <span>
          <Text bold size='large'>
            {playerShowQuery.data?.text.pos_y ?? 'pos_y'}:
          </Text>{' '}
          <Text bold size='large' light>
            {playerShowQuery.data?.pos_y ?? 'player_pos_y'}
          </Text>
        </span>
      </div>
    </div>
  )
}
