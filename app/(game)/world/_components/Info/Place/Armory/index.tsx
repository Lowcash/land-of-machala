'use client'

import React from 'react'
import { useArmoryShowQuery, useArmoryBuyItemMutation, useArmorySellItemMutation } from '@/hooks/api/use-armory'

import { ArmorMarket, WeaponMarket } from './Market'
import { Text, H3 } from '@/styles/typography'
import { Card } from '@/styles/common'
import Loading from '@/components/Loading'
import Alert from '@/components/Alert'

type ArmorMarketOnAction = React.ComponentProps<typeof ArmorMarket>['onAction']
type WeaponMarketOnAction = React.ComponentProps<typeof WeaponMarket>['onAction']

interface Props {
  armoryId: string
}

export default function Armory({ armoryId }: Props) {
  const [message, setMessage] = React.useState<string>()

  const armoryShowQuery = useArmoryShowQuery({ armoryId })

  const armoryBuyItemMutation = useArmoryBuyItemMutation({
    onSuccess: () => setMessage(armoryShowQuery.data?.text.buySuccess ?? 'armor_buy_sucess'),
    onError: () => setMessage(armoryShowQuery.data?.text.buyFailed ?? 'armor_buy_failed'),
  })
  const armorySellItemMutation = useArmorySellItemMutation({
    onSuccess: () => setMessage(armoryShowQuery.data?.text.sellSuccess ?? 'armor_sell_sucess'),
    onError: () => setMessage(armoryShowQuery.data?.text.sellFailed ?? 'armor_sell_failed'),
  })

  if (armoryShowQuery.isLoading) return <Loading position='local' />

  const handleAction: (type: 'armor' | 'weapon') => ArmorMarketOnAction | WeaponMarketOnAction = (type) => {
    return (item, action) => {
      switch (action) {
        case 'buy':
          armoryBuyItemMutation.mutate({ armoryId, armoryItemId: item.itemId, armoryItemType: type })
          break
        case 'sell':
          armorySellItemMutation.mutate({ armoryId, armoryItemId: item.itemId, armoryItemType: type })
          break
      }
    }
  }

  return (
    <>
      <div className='flex flex-col'>
        <Text dangerouslySetInnerHTML={{ __html: armoryShowQuery.data?.text.header ?? 'armory_header' }} />
        <Text
          dangerouslySetInnerHTML={{ __html: armoryShowQuery.data?.text.description ?? 'armory_description' }}
          small
          italic
        />
      </div>

      {message && (
        <Alert>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      )}

      <Card.Inner>
        <H3>{armoryShowQuery.data?.text.weaponBuy ?? 'armory_weapon_buy'}</H3>
        <WeaponMarket armoryId={armoryId} action='buy' onAction={handleAction('weapon')} />
      </Card.Inner>

      <Card.Inner>
        <H3>{armoryShowQuery.data?.text.weaponSell ?? 'armory_weapon_sell'}</H3>
        <WeaponMarket armoryId={armoryId} action='sell' onAction={handleAction('weapon')} />
      </Card.Inner>
      
      <Card.Inner>
        <H3>{armoryShowQuery.data?.text.armorBuy ?? 'armory_armor_buy'}</H3>
        <ArmorMarket armoryId={armoryId} action='buy' onAction={handleAction('armor')} />
      </Card.Inner>

      <Card.Inner>
        <H3>{armoryShowQuery.data?.text.armorSell ?? 'armory_armor_sell'}</H3>
        <ArmorMarket armoryId={armoryId} action='sell' onAction={handleAction('armor')} />
      </Card.Inner>
    </>
  )
}
