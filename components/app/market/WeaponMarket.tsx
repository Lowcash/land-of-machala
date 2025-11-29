'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useArmoryShowQuery } from '@/hooks/api/use-armory'

import { Card } from '@/styles/common'
import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/Table'
import { Decision, type DecisionSelectedEvent } from '@/components/app/Decision'
import { DECISION, type MarketProps } from './types'

export function WeaponMarket({ armoryId, ...p }: MarketProps) {
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
          cells={items?.map((x: any) => [
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
