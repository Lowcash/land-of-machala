'use client'

import React from 'react'
import { loc } from '@/local'
import { useInfoQuery } from '@/hooks/api/useGame'

import * as S from './styles'
import { List } from '@/styles/common-server'
import { Link, Text } from '@/styles/text-server'
import { Button } from '@/components/ui/button'
import Hospital from './Hospital'
import Armory from './Armory'
import Bank from './Bank'

const SUBPLACE = ['hospital', 'armory', 'bank'] as const

type SubPlace = (typeof SUBPLACE)[number]

export default function Place() {
  const [subPlace, setSubPlace] = React.useState<SubPlace | undefined>()

  const gameInfo = useInfoQuery()

  if (!gameInfo.data?.place) return <></>

  if (!!subPlace)
    return (
      <S.Place>
        <Button variant='warning' size={'shrink-sm'} onClick={() => setSubPlace(undefined)}>
          {loc.common.back}
        </Button>
        {subPlace === 'hospital' && <Hospital />}
        {subPlace === 'armory' && <Armory />}
        {subPlace === 'bank' && <Bank />}
      </S.Place>
    )

  return (
    <S.Place>
      <Text>
        {loc.place.your_are_in} <b>{gameInfo.data?.place.name}</b>
      </Text>
      <Text>{gameInfo.data?.place.description}</Text>
      <List>
        {SUBPLACE.map((x) => (
          <li>
            <Link onClick={() => setSubPlace(x)}>{loc.place[x].header}</Link>
          </li>
        ))}
      </List>
    </S.Place>
  )
}
