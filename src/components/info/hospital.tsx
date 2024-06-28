import { Label } from '@radix-ui/react-label'
import { Hospital as ModelHospital } from '@prisma/client'

type Props = Partial<ModelHospital>

export function Hospital(p: Props) {
  return (
    <>
      Nacházíš se v <b>{p.name}</b>
      <br />
      <Label>{p.description}</Label>
      <br />
      <br />
      <Label>{p.subdescription}</Label>
    </>
  )
}
