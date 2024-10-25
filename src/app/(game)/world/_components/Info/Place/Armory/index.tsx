'use client'

import React from 'react'
import { useArmoryQuery, useBuyItemMutation, useSellItemMutation } from '@/hooks/api/useArmory'
import { useInfoQuery } from '@/hooks/api/useGame'

import { WeaponMarket, ArmorMarket, type OnActionParams } from './Market'
import { H3, Text } from '@/styles/text-server'
import Loading from '@/components/loading'
import Alert from '@/components/alert'

export default function Armory() {
  const infoQuery = useInfoQuery()

  // @ts-ignore
  const armoryId = infoQuery.data?.place?.armory.id

  const armoryQuery = useArmoryQuery({ armoryId })

  const buyItemMutation = useBuyItemMutation()
  const sellItemMutation = useSellItemMutation()

  const handleAction = React.useCallback(
    <T extends any>(...onActionArgs: OnActionParams<T>) => {
      const [action, item, type] = onActionArgs

      switch (action) {
        case 'buy':
          buyItemMutation.mutate({ armoryId, armoryItemId: item.marketItemId, armoryItemType: type })
          break
        case 'sell':
          sellItemMutation.mutate({ armoryId, armoryItemId: item.marketItemId, armoryItemType: type })
          break
      }
    },
    [armoryId, buyItemMutation, sellItemMutation],
  )

  const buyWeapons = React.useMemo(
    () => armoryQuery.data?.buyWeapons.map((x) => ({ ...x.weapon, marketItemId: x.id, price: x.price })),
    [armoryQuery.data?.buyWeapons],
  )
  const buyArmors = React.useMemo(
    () => armoryQuery.data?.buyArmors.map((x) => ({ ...x.armor, marketItemId: x.id, price: x.price })),
    [armoryQuery.data?.buyArmors],
  )
  const sellWeapons = React.useMemo(
    () => armoryQuery.data?.sellWeapons.map((x) => ({ ...x.weapon, marketItemId: x.id, price: x.price })),
    [armoryQuery.data?.sellWeapons],
  )
  const sellArmors = React.useMemo(
    () => armoryQuery.data?.sellArmors.map((x) => ({ ...x.armor, marketItemId: x.id, price: x.price })),
    [armoryQuery.data?.sellArmors],
  )

  if (armoryQuery.isLoading) return <Loading />

  const hasBuyWeapons = (buyWeapons?.length ?? 0) > 0
  const hasBuyArmors = (buyArmors?.length ?? 0) > 0
  const hasSellWeapons = (sellWeapons?.length ?? 0) > 0
  const hasSellArmors = (sellArmors?.length ?? 0) > 0

  return (
    <>
      <Text>
        Nacházíš se v <b>{armoryQuery.data?.name}</b>
      </Text>
      <br />
      <Text>{armoryQuery.data?.description}</Text>
      <br />
      <Text>{armoryQuery.data?.subdescription}</Text>

      {!buyItemMutation.isIdle && (
        <>
          <br />
          <Alert>
            {buyItemMutation.isSuccess
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
          <WeaponMarket items={buyWeapons!} action='buy' onAction={handleAction} />
        </>
      )}
      {hasSellWeapons && (
        <>
          <br />
          <br />
          <H3>Prodat Zbraň</H3>
          <br />
          <WeaponMarket items={sellWeapons!} action='sell' onAction={handleAction} />
        </>
      )}

      {hasBuyArmors && (
        <>
          <br />
          <br />
          <H3>Koupit Zbroj</H3>
          <br />
          <ArmorMarket items={buyArmors!} action='buy' onAction={handleAction} />
        </>
      )}

      {hasSellArmors && (
        <>
          <br />
          <br />
          <H3>Prodat Zbroj</H3>
          <br />
          <ArmorMarket items={sellArmors!} action='sell' onAction={handleAction} />
        </>
      )}
    </>
  )
}
