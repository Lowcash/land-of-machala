import { Armor, ArmorInArmory, Weapon, WeaponInArmory } from '@prisma/client'

import { Table } from '@/components/table'
import { Label } from '@radix-ui/react-label'
import { Button } from '../../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export type Action = 'buy' | 'sell'

type Props<T, K> = {
  items: Array<T & { item: K }>
  action: Action

  onAction?: (action: Action, item: K) => void
}

export function WeaponMarket(p: Props<WeaponInArmory, Weapon>) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: 'Poškození' },
        { className: 'text-right', content: `${p.action === 'buy' ? 'Koupit' : 'Prodat'} (Cena)` },
      ]}
      cells={p.items.map((x) => [
        { className: 'text-left', content: x.item.name },
        {
          className: 'text-center',
          content: (
            <>
              {x.item.damage_from}-{x.item.damage_to}
            </>
          ),
        },
        {
          className: 'text-right',
          content: (
            <>
              <Label>{x.price} zlaťáků</Label>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x.item)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}

export function ArmorMarket(p: Props<ArmorInArmory, Armor>) {
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
        { className: 'text-left', content: x.item.name },
        { className: 'text-center', content: x.item.type },
        { className: 'text-center', content: x.item.armor },
        { className: 'text-center', content: x.item.strength },
        { className: 'text-center', content: x.item.agility },
        { className: 'text-center', content: x.item.intelligency },
        {
          className: 'text-right',
          content: (
            <>
              <Label>{x.price} zlaťáků</Label>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x.item)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}
