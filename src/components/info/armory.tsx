import React from 'react'
import { api } from '@/trpc/react'
import { Armory as ModelArmory } from '@prisma/client'
import { Wearable } from '@/const'

import { Label } from '@radix-ui/react-label'
import { Loading } from '../loading'
import { Alert } from '../alert'
import { Table } from '../table'
import { Button } from '../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

type Props = ModelArmory

export function Armory(p: Props) {
  const show = api.armory.show.useQuery({ armoryId: p.id })
  const buy = api.armory.buy.useMutation()

  const handleBuy = React.useCallback(
    (type: Wearable, id: string) => buy.mutate({ armoryId: p.id, itemId: id, itemType: type }),
    [buy, p.id],
  )

  if (show.isLoading) return <Loading />
  if (!show.data) return <></>

  const hasWeapons = (show.data.weapons?.length ?? 0) > 0
  const hasArmors = (show.data?.armors?.length ?? 0) > 0

  return (
    <>
      Nacházíš se v <b>{show.data.name}</b>
      <br />
      <Label>{show.data.description}</Label>
      <br />
      <br />
      <Label>{show.data.subdescription}</Label>
      <br />
      <br />
      {buy.data?.success !== undefined && (
        <Alert>
          {buy.data?.success
            ? 'Zboží zakoupeno (najdeš jej v inventáři)'
            : 'Přijď za mnou znovu, až na to našetříš!? (nedostatek peněz)'}
        </Alert>
      )}
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
            cells={show.data.weapons.map((x) => [
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
                    <Label>{x.price} zlaťáků</Label>
                    &nbsp;
                    <Button variant='secondary' onClick={() => handleBuy('weapon', x.id)}>
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
            cells={show.data.armors.map((x) => [
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
                    <Label>{x.price} zlaťáků</Label>
                    &nbsp;
                    <Button variant='secondary' onClick={() => handleBuy('armor', x.id)}>
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
