'use client'

import { loc } from '@/lib/localization'
import { useGameInfoQuery } from '@/hooks/api/use-game'

import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import Place from '@/app/(game)/world/_components/Info/Place'

export default function Defeated() {
  const gameInfoQuery = useGameInfoQuery()

  const hasPlace = !!gameInfoQuery.data?.place

  return <>
    <Card>
      <Text>{loc.enemy.player_destroyed}</Text>
    </Card>
    {hasPlace && (
      <Card>
        <Place forceSubplace='hospital' />
      </Card>
    )}
  </>
}