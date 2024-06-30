import React from 'react'
import * as S from './index.styles'
import { Label } from '@radix-ui/react-label'
import { Place as ModelPlace, Hospital as ModelHospital, Armor as ModelArmory } from '@prisma/client'
import { Hospital } from './hospital'
import { Armory } from './armory'
import { Button } from '../ui/button'

type SubPlace = 'hospital' | 'armory'

type Props = Partial<ModelPlace> & {
  hospital: Partial<ModelHospital | null>
  armory: Partial<ModelArmory | null>
}

export function Place(p: Props) {
  const [subplace, setSubplace] = React.useState<SubPlace | undefined>(undefined)

  const handleGoToSubPlace = React.useCallback((subplace?: SubPlace) => setSubplace(subplace), [])

  if (subplace === 'hospital')
    return (
      <S.Info>
        <Button variant='outline' onClick={() => handleGoToSubPlace()}>
          Vrátit se
        </Button>
        <br />
        <br />
        <Hospital {...p.hospital} />
      </S.Info>
    )
  if (subplace === 'armory' && !!p.armory?.id)
    return (
      <S.Info>
        <Button variant='outline' onClick={() => handleGoToSubPlace()}>
          Vrátit se
        </Button>
        <br />
        <br />
        <Armory id={p.armory?.id} />
      </S.Info>
    )

  return (
    <S.Info>
      <>
        Nacházíš se v <b>{p.name}</b>
        <br />
        <Label>{p.description}</Label>
        <br />
        <br />
        {p.hospital && <Label onClick={() => handleGoToSubPlace('hospital')}>{p.hospital.name}</Label>}
        <br />
        {p.armory && <Label onClick={() => handleGoToSubPlace('armory')}>{p.armory.name}</Label>}
      </>
    </S.Info>
  )
}
