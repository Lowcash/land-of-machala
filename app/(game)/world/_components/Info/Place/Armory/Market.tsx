import type { Armor, Weapon } from '@prisma/client'
import { useCommonShowQuery } from '@/hooks/api/use-common'

import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

export type Action = 'buy' | 'sell'
export type Type = 'weapon' | 'armor'

type MarketItem<T> = T & { itemId: string; name: string; price: number; text: any }

interface MarketProps<T> {
  items: MarketItem<T>[]
  action: Action

  onAction?: (action: Action, item: MarketItem<T>, type: Type) => void
}

export type OnActionParams<T> = Parameters<NonNullable<MarketProps<T>['onAction']>>

export function WeaponMarket(p: MarketProps<Omit<Weapon, 'id' | 'i18n_key'>>) {
  const commonShowQuery = useCommonShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.damage ?? 'weapon_market_damage' },
        { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'weapon_market_price' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'weapon_market_action' },
      ]}
      cells={p.items.map((x) => [
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
            <Button variant='secondary' onClick={() => p.onAction?.(p.action, x, 'weapon')}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}

export function ArmorMarket(p: MarketProps<Omit<Armor, 'id' | 'i18n_key'>>) {
  const commonShowQuery = useCommonShowQuery()

  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.armor ?? 'armor_market_armor' },
        { className: 'text-center', content: commonShowQuery.data?.text.stregth ?? 'armor_market_stregth' },
        { className: 'text-center', content: commonShowQuery.data?.text.agility ?? 'armor_market_agility' },
        { className: 'text-center', content: commonShowQuery.data?.text.intelligence ?? 'armor_market_intelligence' },
        { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'armor_market_price' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'armor_market_action' },
      ]}
      cells={p.items.map((x) => [
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
            <Button variant='secondary' onClick={() => p.onAction?.(p.action, x, 'armor')}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}
