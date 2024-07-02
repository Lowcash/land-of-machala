import { Armor, Weapon } from '@prisma/client'

import { Table } from '@/components/table'
import { Label } from '@radix-ui/react-label'
import { Button } from '../../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export type Action = 'buy' | 'sell'

export type WeaponItem = Weapon & { armoryWeaponId: string; price: number }

type WeaponMarketProps = {
  weapons: Array<WeaponItem>
  action: Action

  onAction?: (action: Action, weapon: WeaponItem) => void
}

export function WeaponMarket(p: WeaponMarketProps) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: 'Poškození' },
        { className: 'text-right', content: `${p.action === 'buy' ? 'Koupit' : 'Prodat'} (Cena)` },
      ]}
      cells={p.weapons.map((x) => [
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
              <Label>{x.price} zlaťáků</Label>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}

export type ArmorItem = Armor & { armoryArmorId: string; price: number }

type ArmorMarketProps = {
  armors: Array<ArmorItem>
  action: Action

  onAction?: (action: Action, armor: ArmorItem) => void
}

export function ArmorMarket(p: ArmorMarketProps) {
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
      cells={p.armors.map((x) => [
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
              <Label>{x.price} zlaťáků</Label>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}
