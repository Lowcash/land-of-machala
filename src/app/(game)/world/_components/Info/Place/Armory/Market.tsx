import { Armor, Weapon } from '@prisma/client'

import { Text } from '@/styles/text-server'
import { Button } from '@/components/ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
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
        { className: 'text-center', content: 'Poškození' },
        { className: 'text-right', content: `${p.action === 'buy' ? 'Koupit' : 'Prodat'} (Cena)` },
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
            <>
              <Text>{x.price} zlaťáků</Text>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x, 'weapon')}>
                <PaperPlaneIcon />
              </Button>
            </>
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
        { className: 'text-center', content: 'Zbroj' },
        { className: 'text-center', content: 'Síla' },
        { className: 'text-center', content: 'Obratnost' },
        { className: 'text-center', content: 'Inteligence' },
        { className: 'text-right', content: `${p.action === 'buy' ? 'Koupit' : 'Prodat'} (Cena)` },
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
            <>
              <Text>{x.price} zlaťáků</Text>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x, 'armor')}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}
