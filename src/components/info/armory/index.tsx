import React from 'react'
import { api } from '@/trpc/react'

import { H3, Text } from '@/styles/text'
import { Loading } from '../../loading'
import { Alert } from '../../alert'
import { ArmorMarket, WeaponMarket } from './market'
import type { Action, ArmorItem, WeaponItem } from './market'

type Props = {
  id: string
}

export function Armory(p: Props) {
  const { player, armory } = api.useUtils()
  const show = api.armory.show.useQuery({ armoryId: p.id })
  const buy = api.armory.buy.useMutation({
    onSettled: () => {
      player.info.invalidate()
      armory.show.invalidate()
    },
  })
  const sell = api.armory.sell.useMutation({
    onSettled: () => {
      player.info.invalidate()
      player.stats.invalidate()
      player.wearable.invalidate()
      armory.show.invalidate()
    },
  })

  const handleWeaponAction = React.useCallback(
    (action: Action, weapon: WeaponItem) => {
      switch (action) {
        case 'buy':
          buy.mutate({ armoryId: p.id, armoryItemId: weapon.armoryWeaponId, itemType: 'weapon' })
          break
        case 'sell':
          sell.mutate({ armoryId: p.id, armoryItemId: weapon.armoryWeaponId, itemType: 'weapon' })
          break
      }
    },
    [p.id, buy, sell],
  )

  const handleArmorAction = React.useCallback(
    (action: Action, armor: ArmorItem) => {
      switch (action) {
        case 'buy':
          buy.mutate({ armoryId: p.id, armoryItemId: armor.armoryArmorId, itemType: 'armor' })
          break
        case 'sell':
          sell.mutate({ armoryId: p.id, armoryItemId: armor.armoryArmorId, itemType: 'armor' })
          break
      }
    },
    [p.id, buy, sell],
  )

  const buyWeapons = React.useMemo(
    () => show.data?.buyWeapons.map((x) => ({ ...x.weapon, armoryWeaponId: x.id, price: x.price })),
    [show.data?.buyWeapons],
  )
  const buyArmors = React.useMemo(
    () => show.data?.buyArmors.map((x) => ({ ...x.armor, armoryArmorId: x.id, price: x.price })),
    [show.data?.buyArmors],
  )
  const sellWeapons = React.useMemo(
    () => show.data?.sellWeapons.map((x) => ({ ...x.weapon, armoryWeaponId: x.id, price: x.price })),
    [show.data?.sellWeapons],
  )
  const sellArmors = React.useMemo(
    () => show.data?.sellArmors.map((x) => ({ ...x.armor, armoryArmorId: x.id, price: x.price })),
    [show.data?.sellArmors],
  )

  if (show.isLoading) return <Loading />

  const hasBuyWeapons = (buyWeapons?.length ?? 0) > 0
  const hasBuyArmors = (buyArmors?.length ?? 0) > 0
  const hasSellWeapons = (sellWeapons?.length ?? 0) > 0
  const hasSellArmors = (sellArmors?.length ?? 0) > 0

  return (
    <>
      <Text>
        Nacházíš se v <b>{show.data?.name}</b>
      </Text>
      <br />
      <Text>{show.data?.description}</Text>
      <br />
      <Text>{show.data?.subdescription}</Text>

      {buy.data?.success !== undefined && (
        <>
          <br />
          <Alert>
            {buy.data?.success
              ? 'Zboží zakoupeno (najdeš jej v inventáři)'
              : 'Přijď za mnou znovu, až na to našetříš!? (nedostatek peněz)'}
          </Alert>
        </>
      )}

      {hasBuyWeapons && (
        <>
          <br />
          <br />
          <H3>Koupit Zbraň</H3>
          <br />
          <WeaponMarket weapons={buyWeapons!} action='buy' onAction={handleWeaponAction} />
        </>
      )}

      {hasSellWeapons && (
        <>
          <br />
          <br />
          <H3>Prodat Zbraň</H3>
          <br />
          <WeaponMarket weapons={sellWeapons!} action='sell' onAction={handleWeaponAction} />
        </>
      )}

      {hasBuyArmors && (
        <>
          <br />
          <br />
          <H3>Koupit Zbroj</H3>
          <br />
          <ArmorMarket armors={buyArmors!} action='buy' onAction={handleArmorAction} />
        </>
      )}

      {hasSellArmors && (
        <>
          <br />
          <br />
          <H3>Prodat Zbroj</H3>
          <br />
          <ArmorMarket armors={sellArmors!} action='sell' onAction={handleArmorAction} />
        </>
      )}
    </>
  )
}
