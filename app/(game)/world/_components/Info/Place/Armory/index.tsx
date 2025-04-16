'use client'

import React from 'react'
import { loc } from '@/lib/localization'
import { useArmoryShowQuery, useArmoryBuyItemMutation, useArmorySellItemMutation } from '@/hooks/api/use-armory'

import { WeaponMarket, ArmorMarket, type OnActionParams } from './Market'
import { H3, Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import Loading from '@/components/Loading'
import Alert from '@/components/Alert'

interface Props {
  armoryId: string
}

export default function Armory({ armoryId }: Props) {
  const armoryShowQuery = useArmoryShowQuery({ armoryId })

  const armoryBuyItemMutation = useArmoryBuyItemMutation()
  const armorySellItemMutation = useArmorySellItemMutation()

  const handleAction = <T extends any>(...onActionArgs: OnActionParams<T>) => {
    const [action, item, type] = onActionArgs

    switch (action) {
      case 'buy':
        armoryBuyItemMutation.mutate({ armoryId, armoryItemId: item.marketItemId, armoryItemType: type })
        break
      case 'sell':
        armorySellItemMutation.mutate({ armoryId, armoryItemId: item.marketItemId, armoryItemType: type })
        break
    }
  }

  const buyWeapons = armoryShowQuery.data?.buyWeapons?.map((x) => ({ ...x.weapon, marketItemId: x.id, price: x.price }))
  const buyArmors = armoryShowQuery.data?.buyArmors?.map((x) => ({ ...x.armor, marketItemId: x.id, price: x.price }))
  const sellWeapons = armoryShowQuery.data?.sellWeapons?.map((x) => ({ ...x.weapon, marketItemId: x.id, price: x.price }))
  const sellArmors = armoryShowQuery.data?.sellArmors?.map((x) => ({ ...x.armor, marketItemId: x.id, price: x.price }))

  if (armoryShowQuery.isLoading) return <Loading />

  const hasBuyWeapons = (buyWeapons?.length ?? 0) > 0
  const hasBuyArmors = (buyArmors?.length ?? 0) > 0
  const hasSellWeapons = (sellWeapons?.length ?? 0) > 0
  const hasSellArmors = (sellArmors?.length ?? 0) > 0

  return (
    <>
      {/* <Text>
        {loc.place.your_are_in} <b>{armoryShowQuery.data?.name}</b>
      </Text>

      <Text>{armoryShowQuery.data?.description}</Text>

      <Text>{armoryShowQuery.data?.subdescription}</Text>

      {!armoryBuyItemMutation.isIdle && (
        <Alert>{armoryBuyItemMutation.isSuccess ? loc.place.armory.buy_success : loc.place.armory.buy_failed}</Alert>
      )} */}

      {/* {hasBuyWeapons && (
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
      )} */}
    </>
  )
}
