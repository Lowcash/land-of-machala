'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import { type Location } from '@/config'
import { useGameInfoShowQuery } from '@/hooks/api/use-game'
import { useBackground } from '@/context/game-provider'

import { List } from '@/styles/common'
import { Text, Link } from '@/styles/typography'
import { Button } from '@/components/ui/button'

import Hospital from '@/app/(game)/world/_components/Info/Place/Hospital'
import Armory from '@/app/(game)/world/_components/Info/Place/Armory'
import Bank from '@/app/(game)/world/_components/Info/Place/Bank'

interface Props {
  forceSubplace?: Location
}

export default function Place(p: Props) {
  const gameInfoQuery = useGameInfoShowQuery()

  const { subPlace, setSubPlace } = useSetSubplace(p.forceSubplace)

  if (!!subPlace) {
    const hospital = gameInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'hospital')?.place
    const armory = gameInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'armory')?.place
    const bank = gameInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'bank')?.place

    return (
      <>
        <Button variant='warning' size={'shrink-sm'} onClick={() => setSubPlace(undefined)}>
          {i18n.t('common.back')}
        </Button>

        {subPlace === 'hospital' && !!hospital && <Hospital hospitalId={hospital.id} />}
        {subPlace === 'armory' && !!armory && <Armory armoryId={armory.id} />}
        {subPlace === 'bank' && !!bank && <Bank bankId={bank.id} />}
      </>
    )
  }

  return (
    <>
      <Text dangerouslySetInnerHTML={{ __html: gameInfoQuery.data?.place?.text?.header ?? '' }} />
      <Text dangerouslySetInnerHTML={{ __html: gameInfoQuery.data?.place?.text?.description ?? '' }} />

      <List>
        {gameInfoQuery.data?.place?.subplaces?.map((x) => (
          <li key={`SubPlace_${x.type}`}>
            <Link onClick={() => setSubPlace(x.type as Location)}>{i18n.t(`${x.place?.i18n_key}.header` as any)}</Link>
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
