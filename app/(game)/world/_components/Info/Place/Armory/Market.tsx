import i18next from '@/lib/i18n'
import type { Armor, Weapon } from '@prisma/client'

import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

export type Action = 'buy' | 'sell'
export type Type = 'weapon' | 'armor'

type MarketItem<T> = T & { itemId: string; name: string; price: number }

interface MarketProps<T> {
  items: MarketItem<T>[]
  action: Action

  onAction?: (action: Action, item: MarketItem<T>, type: Type) => void
}

export type OnActionParams<T> = Parameters<NonNullable<MarketProps<T>['onAction']>>

export function WeaponMarket(p: MarketProps<Omit<Weapon, 'id' | 'i18n_key'>>) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: i18next.t('stats.damage') },
        { className: 'text-right', content: i18next.t('common.price') },
        { className: 'text-right', content: i18next.t(`common.${p.action}`) },
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
              {x.price} {i18next.t('common.currency')}
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

export function ArmorMarket(p: MarketProps<Omit<Armor, 'id' | 'i18n_key'>>) {
  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: i18next.t('armor.header') },
        { className: 'text-center', content: i18next.t('stats.strength') },
        { className: 'text-center', content: i18next.t('stats.agility') },
        { className: 'text-center', content: i18next.t('stats.intelligence') },
        { className: 'text-right', content: i18next.t('common.price') },
        { className: 'text-right', content: i18next.t(`common.${p.action}`) },
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
          content: (
            <Text>
              {x.price} {i18next.t('common.currency')}
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
