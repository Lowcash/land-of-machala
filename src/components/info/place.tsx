import * as S from './index.styles'
import { Place as ModelPlace, Hospital as ModelHospital, Armor as ModelArmory } from '@prisma/client'
import { Label } from '@radix-ui/react-label'

type Props = ModelPlace & {
  hospital: Partial<ModelHospital | null>
  armory: Partial<ModelArmory | null>
}

export function Place(p: Props) {
  return (
    <S.Info>
      <>
        Nacházíš se v <b>{p.name}</b>
        <br />
        <Label>{p.description}</Label>
        <br />
        <br />
        {p.hospital && <Label>{p.hospital.name}</Label>}
        <br />
        {p.armory && <Label>{p.armory.name}</Label>}
      </>
    </S.Info>
  )
}
