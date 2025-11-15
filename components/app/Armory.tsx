'use client'

import React from 'react'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useArmoryShowQuery, useArmoryBuyItemMutation, useArmorySellItemMutation } from '@/hooks/api/use-armory'

import Alert from '@/components/Alert'
import Loading from '@/components/Loading'
import Info from '@/components/app/Info'
import Decision, { type DecisionSelectedEvent } from '@/components/app/Decision'
import { ArmorMarket, WeaponMarket, type MarketActionEvent, type MarketLeaveEvent } from '@/components/app/Market'

const SUBPLACE = {
  ARMOR_BUY: 'armor_buy',
  WEAPON_BUY: 'weapon_buy',
  ARMOR_SELL: 'armor_sell',
  WEAPON_SELL: 'weapon_sell',
} as const

const DECISION = {
  ...SUBPLACE,
  BACK: 'back',
} as const

interface Props {
  armoryId: string

  onArmoryLeave?: () => void
}

export default function Armory({ armoryId, ...p }: Props) {
  const [subplace, setSubplace] = React.useState<(typeof SUBPLACE)[keyof typeof SUBPLACE]>()
  const [message, setMessage] = React.useState<string>()

  const commonShowQuery = useCommonShowQuery()
  const armoryShowQuery = useArmoryShowQuery({ armoryId })

  const armoryBuyItemMutation = useArmoryBuyItemMutation({
    onSuccess: () => setMessage(armoryShowQuery.data?.text.buySuccess ?? 'armor_buy_sucess'),
    onError: () => setMessage(armoryShowQuery.data?.text.buyFailed ?? 'armor_buy_failed'),
  })
  const armorySellItemMutation = useArmorySellItemMutation({
    onSuccess: () => setMessage(armoryShowQuery.data?.text.sellSuccess ?? 'armor_sell_sucess'),
    onError: () => setMessage(armoryShowQuery.data?.text.sellFailed ?? 'armor_sell_failed'),
  })

  const handleMarketAction: (type: 'armor' | 'weapon') => MarketActionEvent = (type) => {
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

  const handleMarketLeave: MarketLeaveEvent = () => setSubplace(undefined)

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.BACK:
        p.onArmoryLeave?.()
        break
      case DECISION.ARMOR_BUY:
        setSubplace(SUBPLACE.ARMOR_BUY)
        break
      case DECISION.WEAPON_BUY:
        setSubplace(SUBPLACE.WEAPON_BUY)
        break
      case DECISION.ARMOR_SELL:
        setSubplace(SUBPLACE.ARMOR_SELL)
        break
      case DECISION.WEAPON_SELL:
        setSubplace(SUBPLACE.WEAPON_SELL)
        break
    }
  }

  switch (subplace) {
    case SUBPLACE.ARMOR_BUY:
      return (
        <ArmorMarket
          armoryId={armoryId}
          action='buy'
          onMarketAction={handleMarketAction('armor')}
          onMarketLeave={handleMarketLeave}
        />
      )
    case SUBPLACE.WEAPON_BUY:
      return (
        <WeaponMarket
          armoryId={armoryId}
          action='buy'
          onMarketAction={handleMarketAction('weapon')}
          onMarketLeave={handleMarketLeave}
        />
      )
    case SUBPLACE.ARMOR_SELL:
      return (
        <ArmorMarket
          armoryId={armoryId}
          action='sell'
          onMarketAction={handleMarketAction('armor')}
          onMarketLeave={handleMarketLeave}
        />
      )
    case SUBPLACE.WEAPON_SELL:
      return (
        <WeaponMarket
          armoryId={armoryId}
          action='sell'
          onMarketAction={handleMarketAction('weapon')}
          onMarketLeave={handleMarketLeave}
        />
      )
  }

  if (armoryShowQuery.isLoading) return <Loading position='local' />

  return (
    <>
      <Info
        headers={[armoryShowQuery.data?.text.header ?? 'armory_header']}
        descriptions={[armoryShowQuery.data?.text.description ?? 'armory_description']}
      />

      {message && (
        <Alert>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      )}

      <Decision
        top={[
          {
            key: DECISION.BACK,
            text: commonShowQuery.data?.text.cityBack ?? 'armory_city_back',
          },
        ]}
        bottom={[
          { key: DECISION.WEAPON_BUY, text: armoryShowQuery.data?.text.weaponBuy ?? 'armory_weapon_buy' },
          { key: DECISION.ARMOR_BUY, text: armoryShowQuery.data?.text.armorBuy ?? 'armory_armor_buy' },
          { key: DECISION.WEAPON_SELL, text: armoryShowQuery.data?.text.weaponSell ?? 'armory_weapon_sell' },
          { key: DECISION.ARMOR_SELL, text: armoryShowQuery.data?.text.armorSell ?? 'armory_armor_sell' },
        ]}
        onDecisionSelected={handleDecisionSelected}
      />
    </>
  )
}
