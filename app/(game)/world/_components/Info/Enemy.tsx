'use client'

import { loc } from '@/lib/localization'
import { useGameInfoQuery } from '@/hooks/api/use-game'

import Image from 'next/image'
import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'

export default function Enemy() {
  const gameInfoQuery = useGameInfoQuery()

  const name = gameInfoQuery.data?.enemy?.enemy?.name
  const hpActual = gameInfoQuery.data?.enemy?.hp_actual
  const hpMax = gameInfoQuery.data?.enemy?.hp_max

  return <>
    <Card>
      <Text>
        {loc.enemy.appear}&nbsp;
        <b>
          {name} ({hpActual}/{hpMax})
        </b>
        &nbsp;
        {loc.enemy.challenges}
      </Text>
    </Card>

    <Image
      priority
      src={`/images/enemies/${name}.png`}
      alt={name ?? loc.enemy.header}
      width={500}
      height={500}
      className='ml-auto mr-auto mt-auto'
    />
  </>
}