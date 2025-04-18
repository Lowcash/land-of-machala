import i18n from '@/lib/i18n'
import type { Armor, Weapon, Potion } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

export type Action = 'deposit' | 'withdraw'
export type Type = 'weapon' | 'armor' | 'potion'
export type SafeItem<T> = T & { safeItemId: string }

interface SafeProps<T> {
  items: SafeItem<T>[]
  action: Action

  onAction?: (action: Action, item: SafeItem<T>, type: Type) => void
}

export type OnActionParams<T> = Parameters<NonNullable<SafeProps<T>['onAction']>>

export function WeaponSafe(p: SafeProps<Weapon>) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: i18n.t('stats.damage') },
        { className: 'text-right', content: i18n.t(`place.main_city_bank.${p.action}`) },
      ]}
      cells={p.items.map((x) => [
        { className: 'text-left', content: x.i18n_key },
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
            <Button variant='secondary' onClick={() => p.onAction?.(p.action, x, 'weapon')}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}

export function ArmorSafe(p: SafeProps<Armor>) {
  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: i18n.t('armor.header') },
        { className: 'text-center', content: i18n.t('stats.strength') },
        { className: 'text-center', content: i18n.t('stats.agility') },
        { className: 'text-center', content: i18n.t('stats.intelligence') },
        { className: 'text-right', content: i18n.t(`place.main_city_bank.${p.action}`) },
      ]}
      cells={p.items.map((x) => [
        { className: 'text-left', content: x.i18n_key },
        { className: 'text-center', content: x.type },
        { className: 'text-center', content: x.armor },
        { className: 'text-center', content: x.strength },
        { className: 'text-center', content: x.agility },
        { className: 'text-center', content: x.intelligence },
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

export function PotionSafe(p: SafeProps<Potion>) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: i18n.t('consumable.efficiency') },
        { className: 'text-right', content: i18n.t(`place.main_city_bank.${p.action}`) },
      ]}
      cells={p.items.map((x) => [
        { className: 'text-left', content: x.i18n_key },
        {
          className: 'text-center',
          content: `+${x.hp_gain} HP`,
        },
        {
          className: 'text-right',
          content: (
            <Button variant='secondary' onClick={() => p.onAction?.(p.action, x, 'potion')}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}
