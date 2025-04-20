import type { Armor, Weapon, Potion } from '@prisma/client'
import { useCommonShowQuery } from '@/hooks/api/use-common'

import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

export type Action = 'deposit' | 'withdraw'
export type Type = 'weapon' | 'armor' | 'potion'

type SafeItem<T> = T & { safeItemId: string; name: string }

interface SafeProps<T> {
  items: SafeItem<T>[]
  action: Action

  onAction?: (action: Action, item: SafeItem<T>, type: Type) => void
}

export type OnActionParams<T> = Parameters<NonNullable<SafeProps<T>['onAction']>>

export function WeaponSafe(p: SafeProps<Weapon>) {
  const commonShowQuery = useCommonShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.damage ?? 'weapon_safe_damage' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'weapon_safe_action' },
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
  const commonShowQuery = useCommonShowQuery()

  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.armor ?? 'armor_safe_armor' },
        { className: 'text-center', content: commonShowQuery.data?.text.stregth ?? 'armor_safe_strength' },
        { className: 'text-center', content: commonShowQuery.data?.text.agility ?? 'armor_safe_agility' },
        { className: 'text-center', content: commonShowQuery.data?.text.intelligence ?? 'armor_safe_intelligene' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'armor_safe_action' },
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
  const commonShowQuery = useCommonShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.efficiency ?? 'potion_safe_efficiency' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'potion_safe_action' },
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
