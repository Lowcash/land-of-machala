import { Label } from '@radix-ui/react-label'
import { Armory as ModelArmory } from '@prisma/client'

type Props = Partial<ModelArmory>

export function Armory(p: Props) {
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
