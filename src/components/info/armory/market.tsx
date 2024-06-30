import { Armor, ArmorInArmory, Weapon, WeaponInArmory } from '@prisma/client'

import { Table } from '@/components/table'
import { Label } from '@radix-ui/react-label'
import { Button } from '../../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export type Action = 'buy' | 'sell'

type WeaponMarketProps = {
  weapons: Array<WeaponInArmory & { weapon: Weapon }>
  action: Action

  onAction?: (action: Action, weapon: Weapon) => void
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
        { className: 'text-left', content: x.weapon.name },
        {
          className: 'text-center',
          content: (
            <>
              {x.weapon.damage_from}-{x.weapon.damage_to}
            </>
          ),
        },
        {
          className: 'text-right',
          content: (
            <>
              <Label>{x.price} zlaťáků</Label>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x.weapon)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}

type ArmorMarketProps = {
  armors: Array<ArmorInArmory & { armor: Armor }>
  action: Action

  onAction?: (action: Action, armor: Armor) => void
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
        { className: 'text-left', content: x.armor.name },
        { className: 'text-center', content: x.armor.type },
        { className: 'text-center', content: x.armor.armor },
        { className: 'text-center', content: x.armor.strength },
        { className: 'text-center', content: x.armor.agility },
        { className: 'text-center', content: x.armor.intelligency },
        {
          className: 'text-right',
          content: (
            <>
              <Label>{x.price} zlaťáků</Label>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(p.action, x.armor)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}
