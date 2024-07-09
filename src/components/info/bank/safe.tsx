import { Table } from '@/components/table'
import { Button } from '../../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import type { Armor, Weapon, Potion } from '@prisma/client'

export type Action = 'deposit' | 'withdraw'

export type WeaponItem = Weapon & { refItemId: string }

type WeaponSafeProps = {
  weapons: WeaponItem[]
  action: Action

  onAction?: (action: Action, weapon: WeaponItem) => void
}

export function WeaponSafe(p: WeaponSafeProps) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: 'Poškození' },
        { className: 'text-right', content: `${p.action === 'deposit' ? 'Uložit' : 'Vybrat'}` },
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
            <Button variant='secondary' onClick={() => p.onAction?.(p.action, x)}>
              <PaperPlaneIcon />
            </Button>
          ),
        },
      ])}
    />
  )
}

export type ArmorItem = Armor & { refItemId: string }

type ArmorSafeProps = {
  armors: ArmorItem[]
  action: Action

  onAction?: (action: Action, armor: ArmorItem) => void
}

export function ArmorSafe(p: ArmorSafeProps) {
  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: 'Zbroj' },
        { className: 'text-center', content: 'Síla' },
        { className: 'text-center', content: 'Obratnost' },
        { className: 'text-center', content: 'Inteligence' },
        { className: 'text-right', content: `${p.action === 'deposit' ? 'Uložit' : 'Vybrat'}` },
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
            <Button variant='secondary' onClick={() => p.onAction?.(p.action, x)}>
              <PaperPlaneIcon />
            </Button>
          ),
        },
      ])}
    />
  )
}

export type PotionItem = Potion & { refItemId: string }

type PotionSafeProps = {
  potions: PotionItem[]
  action: Action

  onAction?: (action: Action, armor: PotionItem) => void
}

export function PotionSafe(p: PotionSafeProps) {
  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: 'Účinnost' },
        { className: 'text-right', content: `${p.action === 'deposit' ? 'Uložit' : 'Vybrat'}` },
      ]}
      cells={p.potions.map((x) => [
        { className: 'text-left', content: x.name },
        {
          className: 'text-center',
          content: `+${x.hp_gain} HP`,
        },
        {
          className: 'text-right',
          content: (
            <Button variant='secondary' onClick={() => p.onAction?.(p.action, x)}>
              <PaperPlaneIcon />
            </Button>
          ),
        },
      ])}
    />
  )
}
