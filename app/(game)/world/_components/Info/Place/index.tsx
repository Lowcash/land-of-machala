'use client'

import React from 'react'
import i18next from '@/lib/i18n'
import { type Location } from '@/config'
import { useGameInfoQuery } from '@/hooks/api/use-game'
import { useBackground } from '@/context/game-provider'

import { List } from '@/styles/common'
import { Link, Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'

import Hospital from '@/app/(game)/world/_components/Info/Place/Hospital'
import Armory from '@/app/(game)/world/_components/Info/Place/Armory'
import Bank from '@/app/(game)/world/_components/Info/Place/Bank'

interface Props {
  forceSubplace?: Location
}

export default function Place(p: Props) {
  const gameInfoQuery = useGameInfoQuery()

  const armoryId = gameInfoQuery.data?.place?.armory?.id
  const bankId = gameInfoQuery.data?.place?.bank?.id
  const hospitalId = gameInfoQuery.data?.place?.hospital?.id

  const { subPlace, setSubPlace } = useSetSubplace(p.forceSubplace)

  if (!!subPlace)
    return (
      <>
        <Button variant='warning' size={'shrink-sm'} onClick={() => setSubPlace(undefined)}>
          {i18next.t('common.back')}
        </Button>

        {subPlace === 'hospital' && hospitalId && <Hospital hospitalId={hospitalId} />}
        {subPlace === 'armory' && armoryId && <Armory armoryId={armoryId} />}
        {subPlace === 'bank' && bankId && <Bank bankId={bankId} />}
      </>
    )

  return (
    <>
      <Text>
        {i18next.t('place.your_are_in')} <b>{gameInfoQuery.data?.place?.i18n_key}</b>
      </Text>
      <Text>{'gameInfoQuery.data?.place?.description'}</Text>

      <List>
        {SUBPLACES.map((x) => (
          <li key={`SubPlace_${x}`}>
            {/* <Link onClick={() => setSubPlace(x)}>{i18next.t(`${place[x]}.header`)}</Link> */}
          </li>
        ))}
      </List>
    </>
  )
}

function useSetSubplace(forceSubplace?: Location) {
  const [subPlace, setSubPlace] = React.useState<Location | undefined>(forceSubplace)

  const { setLocation } = useBackground()

  React.useEffect(() => setLocation(subPlace ? subPlace : 'city'), [subPlace])

  return { subPlace, setSubPlace }
}

const SUBPLACES = ['hospital', 'armory', 'bank'] satisfies Location[]