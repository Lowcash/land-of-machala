'use client'

import i18n from '@/lib/i18n'
import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import Place from '@/app/(game)/world/_components/Info/Place'

export default function Defeated() {
  const gameInfoQuery = useGameInfoShowQuery()

  const hasPlace = !!gameInfoQuery.data?.place

  return (
    <>
      <Card>
        <Text>{i18n.t('enemy.player_destroyed')}</Text>
      </Card>
      {hasPlace && (
        <Card>
          <Place forceSubplace='hospital' />
        </Card>
      )}
    </>
  )
}
