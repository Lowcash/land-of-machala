'use client'

import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import Place from '@/app/(game)/world/_components/Info/Place'

export default function Defeated() {
  const gameInfoShowQuery = useGameInfoShowQuery()

  const hasPlace = !!gameInfoShowQuery.data?.place

  return (
    <>
      <Card>
        <Text>{gameInfoShowQuery.data?.text?.playerDestroyed ?? 'game_player_destroyed'}</Text>
      </Card>
      {hasPlace && (
        <Card>
          <Place forceSubplace='hospital' />
        </Card>
      )}
    </>
  )
}
