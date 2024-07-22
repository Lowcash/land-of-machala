import React from 'react'

import { Button } from '../ui/button'
import { Text, Link } from '@/styles/text'
import { List } from '@/styles/common'
import { Hospital } from './hospital'
import { Armory } from './armory'
import { Bank } from './bank'
import type {
  Place as ModelPlace,
  Hospital as ModelHospital,
  Armor as ModelArmory,
  Bank as ModelBank,
} from '@prisma/client'

type SubPlace = 'hospital' | 'armory' | 'bank'

type Props = Partial<ModelPlace> & {
  hospital: Partial<ModelHospital | null>
  armory: Partial<ModelArmory | null>
  bank: Partial<ModelBank | null>

  defeated?: boolean
  forceSubplace?: SubPlace
}

export function Place(p: Props) {
  const [subplace, setSubplace] = React.useState<SubPlace | undefined>(p.forceSubplace)

  const handleGoToSubPlace = React.useCallback((subplace?: SubPlace) => setSubplace(subplace), [])

  if (subplace !== undefined)
    return (
      <>
        {!p.defeated && (
          <>
            <Button variant='warning' onClick={() => handleGoToSubPlace()}>
              Vrátit se
            </Button>
            <br />
            <br />
          </>
        )}
        {subplace === 'hospital' && !!p.hospital?.id && <Hospital id={p.hospital.id} defeated={p.defeated} />}
        {subplace === 'armory' && !!p.armory?.id && <Armory id={p.armory.id} />}
        {subplace === 'bank' && !!p.bank?.id && <Bank id={p.bank.id} />}
      </>
    )

  const hasHospital = !!p.hospital
  const hasArmory = !!p.armory
  const hasBank = !!p.bank

  return (
    <>
      <Text>
        Nacházíš se v <b>{p.name}</b>
      </Text>
      <br />
      <Text>{p.description}</Text>
      {(hasHospital || hasArmory || hasBank) && (
        <>
          <br />
          <br />
          <List>
            {hasHospital && (
              <li>
                <Link onClick={() => handleGoToSubPlace('hospital')}>{p.hospital!.name}</Link>
              </li>
            )}
            {hasArmory && (
              <li>
                <Link onClick={() => handleGoToSubPlace('armory')}>{p.armory!.name}</Link>
              </li>
            )}
            {hasBank && (
              <li>
                <Link onClick={() => handleGoToSubPlace('bank')}>{p.bank!.name}</Link>
              </li>
            )}
          </List>
        </>
      )}
    </>
  )
}
