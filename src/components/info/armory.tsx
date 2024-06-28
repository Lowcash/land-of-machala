import { api } from '@/trpc/react'

import { Label } from '@radix-ui/react-label'
import { Loading } from '../loading'
import { Armory as ModelArmory } from '@prisma/client'
import { Table } from '../table'
import { Button } from '../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import React from 'react'

type Props = ModelArmory

export function Armory(p: Props) {
  const armory = api.armory.show.useQuery({ armoryId: p.id })

  const handleBuy = React.useCallback(() => {}, [])

  if (armory.isLoading) return <Loading />
  if (!armory.data) return <></>

  const hasWeapons = (armory.data.weapons?.length ?? 0) > 0
  const hasArmors = (armory.data?.armors?.length ?? 0) > 0

  return (
    <>
      Nacházíš se v <b>{armory.data.name}</b>
      <br />
      <Label>{armory.data.description}</Label>
      <br />
      <br />
      <Label>{armory.data.subdescription}</Label>
      <br />
      <br />
      {hasWeapons && (
        <>
          <Label>Zbraň</Label>
          <br />
          <Table
            columns={[
              {},
              { className: 'text-center', content: 'Poškození' },
              { className: 'text-right', content: 'Koupit (Cena)' },
            ]}
            cells={armory.data.weapons.map((x) => [
              { className: 'text-left', content: x.weapon.name },
              {
                className: 'text-center',
                content: (
                  <>
                    {x.weapon.damage_from}-{x.weapon.damage_to}
                  </>
                ),
              },
              {
                className: 'text-right',
                content: (
                  <>
                    <Label>{10} zlaťáků</Label>
                    &nbsp;
                    <Button variant='secondary' onClick={() => handleBuy()}>
                      <PaperPlaneIcon />
                    </Button>
                  </>
                ),
              },
            ])}
          />
        </>
      )}
      {hasArmors && (
        <>
          <Label>Zbroj</Label>
          <br />
          <Table
            columns={[
              {},
              {},
              { className: 'text-center', content: 'Zbroj' },
              { className: 'text-center', content: 'Síla' },
              { className: 'text-center', content: 'Obratnost' },
              { className: 'text-center', content: 'Inteligence' },
              { className: 'text-right', content: 'Koupit (Cena)' },
            ]}
            cells={armory.data.armors.map((x) => [
              { className: 'text-left', content: x.armor.name },
              { className: 'text-center', content: x.armor.type },
              { className: 'text-center', content: x.armor.armor },
              { className: 'text-center', content: x.armor.strength },
              { className: 'text-center', content: x.armor.agility },
              { className: 'text-center', content: x.armor.intelligency },
              {
                className: 'text-right',
                content: (
                  <>
                    <Label>{10} zlaťáků</Label>
                    &nbsp;
                    <Button variant='secondary' onClick={() => handleBuy()}>
                      <PaperPlaneIcon />
                    </Button>
                  </>
                ),
              },
            ])}
          />
        </>
      )}
    </>
  )
}
