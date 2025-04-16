import { loc } from '@/lib/localization'
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
        { className: 'text-center', content: loc.stats.damage },
        { className: 'text-right', content: loc.place.bank[p.action] },
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
        { className: 'text-center', content: loc.armor.header },
        { className: 'text-center', content: loc.stats.strength },
        { className: 'text-center', content: loc.stats.agility },
        { className: 'text-center', content: loc.stats.intelligence },
        { className: 'text-right', content: loc.place.bank[p.action] },
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
        { className: 'text-center', content: loc.potion.efficiency },
        { className: 'text-right', content: loc.place.bank[p.action] },
      ]}
      cells={p.items.map((x) => [
        { className: 'text-left', content: x.name },
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
