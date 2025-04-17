'use client'

import i18next from '@/lib/i18n'
import { useGameInfoQuery } from '@/hooks/api/use-game'

import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import Place from '@/app/(game)/world/_components/Info/Place'

export default function Defeated() {
  const gameInfoQuery = useGameInfoQuery()

  const hasPlace = !!gameInfoQuery.data?.place

  return (
    <>
      <Card>
        <Text>{i18next.t('enemy.player_destroyed')}</Text>
      </Card>
      {hasPlace && (
        <Card>
          <Place forceSubplace='hospital' />
        </Card>
      )}
    </>
  )
}
