import { loc } from '@/lib/localization'
import type { Armor, Weapon } from '@prisma/client'

import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

export type Action = 'buy' | 'sell'
export type Type = 'weapon' | 'armor'

export type MarketItem<T> = T & { marketItemId: string; price: number }

interface MarketProps<T> {
  items: MarketItem<T>[]
  action: Action

  onAction?: (action: Action, item: MarketItem<T>, type: Type) => void
}

export type OnActionParams<T> = Parameters<NonNullable<MarketProps<T>['onAction']>>

export function WeaponMarket(p: MarketProps<Weapon>) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: loc.stats.damage },
        { className: 'text-right', content: loc.common.price },
        { className: 'text-right', content: loc.common[p.action] },
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
          content: (
            <Text>
              {x.price} {loc.common.currency}
            </Text>
          ),
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

export function ArmorMarket(p: MarketProps<Armor>) {
  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: loc.armor.header },
        { className: 'text-center', content: loc.stats.strength },
        { className: 'text-center', content: loc.stats.agility },
        { className: 'text-center', content: loc.stats.intelligence },
        { className: 'text-right', content: loc.common.price },
        { className: 'text-right', content: loc.common[p.action] },
      ]}
      cells={p.items.map((x) => [
        { className: 'text-left', content: x.name },
        { className: 'text-center', content: x.type },
        { className: 'text-center', content: x.armor },
        { className: 'text-center', content: x.strength },
        { className: 'text-center', content: x.agility },
        { className: 'text-center', content: x.intelligency },
        {
          className: 'text-right',
          content: (
            <Text>
              {x.price} {loc.common.currency}
            </Text>
          ),
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
