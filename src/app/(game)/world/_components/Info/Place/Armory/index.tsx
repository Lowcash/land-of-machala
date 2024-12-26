'use client'

import React from 'react'
import { loc } from '@/localization'
import { useArmoryQuery, useBuyItemMutation, useSellItemMutation } from '@/hooks/api/useArmory'
import { useShowInfoQuery } from '@/hooks/api/useGame'

import { WeaponMarket, ArmorMarket, type OnActionParams } from './Market'
import { H3, Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import Loading from '@/components/loading'
import Alert from '@/components/alert'

export default function Armory() {
  const infoQuery = useShowInfoQuery()

  const armoryId = infoQuery.data?.place?.armory?.id!
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
        {loc.place.your_are_in} <b>{armoryQuery.data?.name}</b>
      </Text>

      <Text>{armoryQuery.data?.description}</Text>

      <Text>{armoryQuery.data?.subdescription}</Text>

      {!buyItemMutation.isIdle && (
        <Alert>{buyItemMutation.isSuccess ? loc.place.armory.buy_success : loc.place.armory.buy_failed}</Alert>
      )}

        {hasBuyWeapons && (
          <Card.Inner>
            <H3>{loc.weapon.buy}</H3>
            <WeaponMarket items={buyWeapons!} action='buy' onAction={handleAction} />
          </Card.Inner>
        )}
        {hasSellWeapons && (
          <Card.Inner>
            <H3>{loc.weapon.sell}</H3>
            <WeaponMarket items={sellWeapons!} action='sell' onAction={handleAction} />
          </Card.Inner>
        )}

        {hasBuyArmors && (
          <Card.Inner>
            <H3>{loc.armor.buy}</H3>
            <ArmorMarket items={buyArmors!} action='buy' onAction={handleAction} />
          </Card.Inner>
        )}

        {hasSellArmors && (
          <Card.Inner>
            <H3>{loc.armor.sell}</H3>
            <ArmorMarket items={sellArmors!} action='sell' onAction={handleAction} />
          </Card.Inner>
        )}
    </>
  )
}
