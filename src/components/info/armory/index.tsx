import React from 'react'
import { api } from '@/trpc/react'
import { Armor, Weapon } from '@prisma/client'

import { Label } from '@radix-ui/react-label'
import { Loading } from '../../loading'
import { Alert } from '../../alert'
import { Action, ArmorMarket, WeaponMarket } from './market'

type Props = {
  id: string
}

export function Armory(p: Props) {
  const show = api.armory.show.useQuery({ armoryId: p.id })
  const buy = api.armory.buy.useMutation()

  const handleWeaponAction = React.useCallback(
    (action: Action, weapon: Weapon) => {
      switch (action) {
        case 'buy':
          buy.mutate({ armoryId: p.id, itemId: weapon.id, itemType: 'weapon' }), [buy, p.id]
          break
        case 'sell':
          buy.mutate({ armoryId: p.id, itemId: weapon.id, itemType: 'weapon' }), [buy, p.id]
          break
      }
    },
    [p.id, buy],
  )

  const handleArmorAction = React.useCallback(
    (action: Action, armor: Armor) => {
      switch (action) {
        case 'buy':
          buy.mutate({ armoryId: p.id, itemId: armor.id, itemType: 'armor' }), [buy, p.id]
          break
        case 'sell':
          buy.mutate({ armoryId: p.id, itemId: armor.id, itemType: 'armor' }), [buy, p.id]
          break
      }
    },
    [p.id, buy],
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
          <br />
          <br />
          <Label>Koupit Zbraň</Label>
          <br />
          <WeaponMarket weapons={show.data.weapons} action='buy' onAction={handleWeaponAction} />
          <br />
          <Label>Prodat Zbraň</Label>
          <br />
          <WeaponMarket weapons={show.data.weapons} action='sell' onAction={handleWeaponAction} />
        </>
      )}
      {hasArmors && (
        <>
          <br />
          <br />
          <Label>Koupit Zbroj</Label>
          <br />
          <ArmorMarket armors={show.data.armors} action='buy' onAction={handleArmorAction} />
          <br />
          <ArmorMarket armors={show.data.armors} action='sell' onAction={handleArmorAction} />
        </>
      )}
    </>
  )
}
