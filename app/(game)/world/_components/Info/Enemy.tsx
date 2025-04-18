'use client'

import i18n from '@/lib/i18n'
import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import Image from 'next/image'
import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'

export default function Enemy() {
  const gameInfoQuery = useGameInfoShowQuery()

  const name = gameInfoQuery.data?.enemy?.enemy?.id
  const hpActual = gameInfoQuery.data?.enemy?.hp_actual
  const hpMax = gameInfoQuery.data?.enemy?.hp_max

  return <>
    <Card>
      <Text>
        {i18n.t('enemy.appear')}&nbsp;
        <b>
          {name} ({hpActual}/{hpMax})
        </b>
        &nbsp;
        {i18n.t('enemy.challenges')}
      </Text>
    </Card>

    <Image
      priority
      src={`/images/enemies/${name}.png`}
      alt={name ?? 'enemy'}
      width={500}
      height={500}
      className='ml-auto mr-auto mt-auto'
    />
  </>
}