'use client'

import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import Image from 'next/image'
import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'

export default function Enemy() {
  const gameInfoShowQuery = useGameInfoShowQuery()

  return (
    <>
      <Card>
        <Text dangerouslySetInnerHTML={{ __html: gameInfoShowQuery.data?.text?.enemyAppear ?? 'game_enemy_appear' }} />
      </Card>

      <Image
        priority
        src={`/images/enemies/${gameInfoShowQuery.data?.enemy?.enemy?.id}.png`}
        alt={name ?? 'enemy'}
        width={500}
        height={500}
        className='ml-auto mr-auto mt-auto'
      />
    </>
  )
}
