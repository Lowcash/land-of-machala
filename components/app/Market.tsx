'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useArmoryShowQuery, type ArmoryItem } from '@/hooks/api/use-armory'

import { Card } from '@/styles/common'
import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/Table'
import Decision, { type DecisionSelectedEvent } from '@/components/app/Decision'

export type MarketActionEvent = (item: ArmoryItem, action: Action) => void
export type MarketLeaveEvent = () => void

type Action = 'buy' | 'sell'

const DECISION = {
  BACK: 'back',
} as const

interface Props {
  armoryId: string

  action: Action

  onMarketAction: MarketActionEvent
  onMarketLeave?: MarketLeaveEvent
}

export function ArmorMarket({ armoryId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const armoryShowQuery = useArmoryShowQuery({ armoryId })

  const items = p.action === 'buy' ? armoryShowQuery.data?.buyArmors : armoryShowQuery.data?.sellArmors

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.BACK:
        p.onMarketLeave?.()
        break
    }
  }

  return (
    <>
      <Decision
        top={[
          {
            key: DECISION.BACK,
            text: commonShowQuery.data?.text.back ?? 'market_back',
          },
        ]}
        onDecisionSelected={handleDecisionSelected}
      />

      <Card>
        <Table
          columns={[
            {},
            {},
            { className: 'text-center', content: commonShowQuery.data?.text.armor ?? 'armor_market_armor' },
            { className: 'text-center', content: commonShowQuery.data?.text.stregth ?? 'armor_market_stregth' },
            { className: 'text-center', content: commonShowQuery.data?.text.agility ?? 'armor_market_agility' },
            {
              className: 'text-center',
              content: commonShowQuery.data?.text.intelligence ?? 'armor_market_intelligence',
            },
            { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'armor_market_price' },
            { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'armor_market_action' },
          ]}
          cells={items?.map((x) => [
            { className: 'text-left', content: x.name },
            { className: 'text-center', content: x.type },
            { className: 'text-center', content: x.armor },
            { className: 'text-center', content: x.strength },
            { className: 'text-center', content: x.agility },
            { className: 'text-center', content: x.intelligence },
            {
              className: 'text-right',
              content: <Text>{x.text.price}</Text>,
            },
            {
              className: 'text-right',
              content: (
                <Button variant='secondary' onClick={() => p.onMarketAction?.(x, p.action)}>
                  <RxPaperPlane />
                </Button>
              ),
            },
          ])}
        />
      </Card>
    </>
  )
}

export function WeaponMarket({ armoryId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const armoryShowQuery = useArmoryShowQuery({ armoryId })

  const items = p.action === 'buy' ? armoryShowQuery.data?.buyWeapons : armoryShowQuery.data?.sellWeapons

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.BACK:
        p.onMarketLeave?.()
        break
    }
  }

  return (
    <>
      <Decision
        top={[
          {
            key: DECISION.BACK,
            text: commonShowQuery.data?.text.back ?? 'market_back',
          },
        ]}
        onDecisionSelected={handleDecisionSelected}
      />

      <Card>
        <Table
          columns={[
            {},
            { className: 'text-center', content: commonShowQuery.data?.text.damage ?? 'weapon_market_damage' },
            { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'weapon_market_price' },
            { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'weapon_market_action' },
          ]}
          cells={items?.map((x) => [
            { className: 'text-left', content: x.name },
            {
              className: 'text-center',
              content: (
                <>
                  {x.damage_from}-{x.damage_to}
                </>
              ),
            },
            {
              className: 'text-right',
              content: <Text>{x.text.price}</Text>,
            },
            {
              className: 'text-right',
              content: (
                <Button variant='secondary' onClick={() => p.onMarketAction?.(x, p.action)}>
                  <RxPaperPlane />
                </Button>
              ),
            },
          ])}
        />
      </Card>
    </>
  )
}
