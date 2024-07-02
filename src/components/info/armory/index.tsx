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
  const sell = api.armory.sell.useMutation()

  const handleWeaponAction = React.useCallback(
    (action: Action, weapon: Weapon) => {
      switch (action) {
        case 'buy':
          buy.mutate({ armoryId: p.id, itemId: weapon.id, itemType: 'weapon' }), [buy, p.id]
          break
        case 'sell':
          sell.mutate({ armoryId: p.id, itemId: weapon.id, itemType: 'weapon' }), [sell, p.id]
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
          sell.mutate({ armoryId: p.id, itemId: armor.id, itemType: 'armor' }), [sell, p.id]
          break
      }
    },
    [p.id, buy],
  )

  const buyWeapons = React.useMemo(
    () => show.data?.buyWeapons.map((x) => ({ ...x.weapon, price: x.price })),
    [show.data?.buyWeapons],
  )
  const buyArmors = React.useMemo(
    () => show.data?.buyArmors.map((x) => ({ ...x.armor, price: x.price })),
    [show.data?.buyArmors],
  )
  const sellWeapons = React.useMemo(
    () => show.data?.sellWeapons.map((x) => ({ ...x.weapon, price: x.price })),
    [show.data?.sellWeapons],
  )
  const sellArmors = React.useMemo(
    () => show.data?.sellArmors.map((x) => ({ ...x.armor, price: x.price })),
    [show.data?.sellArmors],
  )

  if (show.isLoading) return <Loading />
  if (!show.data) return <></>

  const hasBuyWeapons = (buyWeapons?.length ?? 0) > 0
  const hasBuyArmors = (buyArmors?.length ?? 0) > 0
  const hasSellWeapons = (sellWeapons?.length ?? 0) > 0
  const hasSellArmors = (sellArmors?.length ?? 0) > 0

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
      {hasBuyWeapons && (
        <>
          <br />
          <br />
          <Label>Koupit Zbraň</Label>
          <br />
          <WeaponMarket weapons={buyWeapons!} action='buy' onAction={handleWeaponAction} />
        </>
      )}
      {hasSellWeapons && (
        <>
          <br />
          <br />
          <Label>Prodat Zbraň</Label>
          <br />
          <WeaponMarket weapons={sellWeapons!} action='sell' onAction={handleWeaponAction} />
        </>
      )}
      {hasBuyArmors && (
        <>
          <br />
          <br />
          <Label>Koupit Zbroj</Label>
          <br />
          <ArmorMarket armors={buyArmors!} action='buy' onAction={handleArmorAction} />
        </>
      )}
      {hasSellArmors && (
        <>
          <br />
          <br />
          <Label>Prodat Zbroj</Label>
          <br />
          <ArmorMarket armors={sellArmors!} action='sell' onAction={handleArmorAction} />
        </>
      )}
    </>
  )
}
