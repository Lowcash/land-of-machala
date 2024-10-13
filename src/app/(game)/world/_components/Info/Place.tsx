'use client'

import React from 'react'
import { useGameInfoQuery } from '@/data/game'

import { Link, Text } from '@/styles/text-server'
import { List } from '@/styles/common-server'
import { Button } from '@/components/ui/button'

type SubPlace = 'hospital' | 'armory' | 'bank'

export default function Place() {
  const [subPlace, setSubPlace] = React.useState<SubPlace | undefined>()

  const gameInfo = useGameInfoQuery()

  // @ts-ignore
  if (!gameInfo.data?.place) return <></>

  if (!!subPlace)
    return (
      <div>
        <Button variant='warning' onClick={() => setSubPlace(undefined)}>
          Vrátit se
        </Button>
        {subPlace === 'hospital' && 'hospital'}
        {subPlace === 'armory' && 'armory'}
        {subPlace === 'bank' && 'bank'}
      </div>
    )

  return (
    <div className='flex flex-col'>
      <Text>
        {/* @ts-ignore */}
        Nacházíš se v <b>{gameInfo.data?.place.name}</b>
      </Text>
      <br />
      {/* @ts-ignore */}
      <Text>{gameInfo.data?.place.description}</Text>
      <br />
      <List>
        <li>
          <Link onClick={() => setSubPlace('hospital')}>hospital</Link>
        </li>
        <li>
          <Link onClick={() => setSubPlace('armory')}>armory</Link>
        </li>
        <li>
          <Link onClick={() => setSubPlace('bank')}>bank</Link>
        </li>
      </List>
    </div>
  )
}
