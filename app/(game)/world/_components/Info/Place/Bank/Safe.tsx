import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useBankShowAccountQuery, type BankAccountItem } from '@/hooks/api/use-bank'
import { useInventoryShowQuery, type InventoryItem } from '@/hooks/api/use-inventory'

import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

type Action = 'deposit' | 'withdraw'

interface Props {
  bankId: string

  action: Action
  onAction?: (item: BankAccountItem | InventoryItem, action: Action) => void
}

export function ArmorSafe({ bankId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const inventoryShowQuery = useInventoryShowQuery()
  const bankAccountShowQuery = useBankShowAccountQuery({ bankId })

  const items = p.action === 'deposit' ? inventoryShowQuery.data?.armors : bankAccountShowQuery.data?.armors

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
      cells={items?.map((x) => [
        { className: 'text-left', content: x.armor.name },
        { className: 'text-center', content: x.armor.type },
        { className: 'text-center', content: x.armor.armor },
        { className: 'text-center', content: x.armor.strength },
        { className: 'text-center', content: x.armor.agility },
        { className: 'text-center', content: x.armor.intelligence },
        {
          className: 'text-right',
          content: (
            <Button variant='secondary' onClick={() => p.onAction?.(x, p.action)}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}

export function WeaponSafe({ bankId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const inventoryShowQuery = useInventoryShowQuery()
  const bankAccountShowQuery = useBankShowAccountQuery({ bankId })

  const items = p.action === 'deposit' ? inventoryShowQuery.data?.weapons : bankAccountShowQuery.data?.weapons

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.damage ?? 'weapon_safe_damage' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'weapon_safe_action' },
      ]}
      cells={items?.map((x) => [
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
            <Button variant='secondary' onClick={() => p.onAction?.(x, p.action)}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}

export function PotionSafe({ bankId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const inventoryShowQuery = useInventoryShowQuery()
  const bankAccountShowQuery = useBankShowAccountQuery({ bankId })

  const items = p.action === 'deposit' ? inventoryShowQuery.data?.potions : bankAccountShowQuery.data?.potions

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.efficiency ?? 'potion_safe_efficiency' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'potion_safe_action' },
      ]}
      cells={items?.map((x) => [
        { className: 'text-left', content: x.potion.name },
        {
          className: 'text-center',
          content: `+${x.potion.hp_gain} HP`,
        },
        {
          className: 'text-right',
          content: (
            <Button variant='secondary' onClick={() => p.onAction?.(x, p.action)}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}
