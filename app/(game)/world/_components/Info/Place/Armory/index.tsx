'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import { useArmoryShowQuery, useArmoryBuyItemMutation, useArmorySellItemMutation } from '@/hooks/api/use-armory'

import { WeaponMarket, ArmorMarket, type OnActionParams } from './Market'
import { Text, H3 } from '@/styles/typography'
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
        armoryBuyItemMutation.mutate({ armoryId, armoryItemId: item.itemId, armoryItemType: type })
        break
      case 'sell':
        armorySellItemMutation.mutate({ armoryId, armoryItemId: item.itemId, armoryItemType: type })
        break
    }
  }

  if (armoryShowQuery.isLoading) return <Loading position='local' />

  const hasBuyWeapons = (armoryShowQuery.data?.buyWeapons?.length ?? 0) > 0
  const hasBuyArmors = (armoryShowQuery.data?.buyArmors?.length ?? 0) > 0
  const hasSellWeapons = (armoryShowQuery.data?.sellWeapons?.length ?? 0) > 0
  const hasSellArmors = (armoryShowQuery.data?.sellArmors?.length ?? 0) > 0

  return (
    <>
      <Text dangerouslySetInnerHTML={{ __html: armoryShowQuery.data?.text.header ?? '' }} />
      <Text dangerouslySetInnerHTML={{ __html: armoryShowQuery.data?.text.description ?? '' }} />

      {!armoryBuyItemMutation.isIdle && (
        <Alert>
          {armoryBuyItemMutation.isSuccess
            ? armoryShowQuery.data?.text.buySuccess
            : armoryShowQuery.data?.text.buyFailed}
        </Alert>
      )}

      {hasBuyWeapons && (
        <Card.Inner>
          <H3>{i18n.t('weapon.buy')}</H3>
          <WeaponMarket items={armoryShowQuery.data?.buyWeapons!} action='buy' onAction={handleAction} />
        </Card.Inner>
      )}
      {hasSellWeapons && (
        <Card.Inner>
          <H3>{i18n.t('weapon.sell')}</H3>
          <WeaponMarket items={armoryShowQuery.data?.sellWeapons!} action='sell' onAction={handleAction} />
        </Card.Inner>
      )}

      {hasBuyArmors && (
        <Card.Inner>
          <H3>{i18n.t('armor.buy')}</H3>
          <ArmorMarket items={armoryShowQuery.data?.buyArmors!} action='buy' onAction={handleAction} />
        </Card.Inner>
      )}

      {hasSellArmors && (
        <Card.Inner>
          <H3>{i18n.t('armor.sell')}</H3>
          <ArmorMarket items={armoryShowQuery.data?.sellArmors!} action='sell' onAction={handleAction} />
        </Card.Inner>
      )}
    </>
  )
}
