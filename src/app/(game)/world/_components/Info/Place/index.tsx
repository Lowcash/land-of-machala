'use client'

import React from 'react'
import { loc } from '@/localization'
import { useShowInfoQuery } from '@/hooks/api/useGame'

import { List } from '@/styles/common-server'
import { Link, Text } from '@/styles/text-server'
import { Button } from '@/components/ui/button'
import Hospital from './Hospital'
import Armory from './Armory'
import Bank from './Bank'

const SUBPLACE = ['hospital', 'armory', 'bank'] as const

type SubPlace = (typeof SUBPLACE)[number]

interface Props {
  forceSubplace?: SubPlace
}

export default function Place(p: Props) {
  const [subPlace, setSubPlace] = React.useState<SubPlace | undefined>(p.forceSubplace)

  const gameInfo = useShowInfoQuery()

  if (!gameInfo.data?.place) return <></>

  if (!!subPlace)
    return (
      <>
        <Button variant='warning' size={'shrink-sm'} onClick={() => setSubPlace(undefined)}>
          {loc.common.back}
        </Button>
        {subPlace === 'hospital' && <Hospital />}
        {subPlace === 'armory' && <Armory />}
        {subPlace === 'bank' && <Bank />}
      </>
    )

  return (
    <>
      <Text>
        {loc.place.your_are_in} <b>{gameInfo.data?.place.name}</b>
      </Text>
      <Text>{gameInfo.data?.place.description}</Text>
      <List>
        {SUBPLACE.map((x) => (
          <li key={`SubPlace_${x}`}>
            <Link onClick={() => setSubPlace(x)}>{loc.place[x].header}</Link>
          </li>
        ))}
      </List>
    </>
  )
}
