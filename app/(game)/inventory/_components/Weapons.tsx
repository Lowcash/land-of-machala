'use client'

import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import Table from '@/components/Table'
import Wear from '@/app/(game)/inventory/_components/Wear'
import Unwear from '@/app/(game)/inventory/_components/Unwear'

export default function Weapons() {
  const inventoryShowQuery = useInventoryShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: inventoryShowQuery.data?.text.damage ?? 'inventory_damage' },
        {
          className: 'text-center',
          content: `${inventoryShowQuery.data?.text.wear ?? 'inventory_wear'} (${inventoryShowQuery.data?.text.left_hand ?? 'inventory_left_hand'})`,
        },
        {
          className: 'text-center',
          content: `${inventoryShowQuery.data?.text.wear ?? 'inventory_wear'} (${inventoryShowQuery.data?.text.right_hand ?? 'inventory_right_hand'}})`,
        },
      ]}
      cells={inventoryShowQuery.data?.weapons.map((x) => [
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
          className: 'text-center',
          content: (
            <>
              {!x.armed_left && <Wear type='left_weapon' inventoryWearableId={x.id} />}
              {x.armed_left && <Unwear type='weapon' inventoryWearableId={x.id} />}
            </>
          ),
        },
        {
          className: 'text-center',
          content: (
            <>
              {!x.armed_right && <Wear type='right_weapon' inventoryWearableId={x.id} />}
              {x.armed_right && <Unwear type='weapon' inventoryWearableId={x.id} />}
            </>
          ),
        },
      ])}
    />
  )
}
