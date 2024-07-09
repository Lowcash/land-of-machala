import React from 'react'
import * as S from './index.styles'
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
}

export function Place(p: Props) {
  const [subplace, setSubplace] = React.useState<SubPlace | undefined>(undefined)

  const handleGoToSubPlace = React.useCallback((subplace?: SubPlace) => setSubplace(subplace), [])

  if (subplace !== undefined)
    return (
      <S.Info>
        <Button variant='outline' onClick={() => handleGoToSubPlace()}>
          Vrátit se
        </Button>
        <br />
        <br />
        {subplace === 'hospital' && !!p.hospital?.id && <Hospital id={p.hospital.id} />}
        {subplace === 'armory' && !!p.armory?.id && <Armory id={p.armory.id} />}
        {subplace === 'bank' && !!p.bank?.id && <Bank id={p.bank.id} />}
      </S.Info>
    )

  return (
    <S.Info>
      <>
        Nacházíš se v <b>{p.name}</b>
        <br />
        <Text>{p.description}</Text>
        <br />
        <br />
        <List>
          {p.hospital && (
            <li>
              <Link onClick={() => handleGoToSubPlace('hospital')}>{p.hospital.name}</Link>
            </li>
          )}
          {p.armory && (
            <li>
              <Link onClick={() => handleGoToSubPlace('armory')}>{p.armory.name}</Link>
            </li>
          )}
          {p.bank && (
            <li>
              <Link onClick={() => handleGoToSubPlace('bank')}>{p.bank.name}</Link>
            </li>
          )}
        </List>
      </>
    </S.Info>
  )
}
