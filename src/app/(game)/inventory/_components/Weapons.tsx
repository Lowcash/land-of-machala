'use client'

import { useShowInventoryQuery } from '@/hooks/api/useInventory'

import Table from '@/components/table'
import Wear from './Wear'
import Unwear from './Unwear'

export default function Weapons() {
  const showInventory = useShowInventoryQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: 'Poškození' },
        { className: 'text-center', content: 'Obléct (levá ruka)' },
        { className: 'text-center', content: 'Obléct (pravá ruka)' },
      ]}
      cells={showInventory.data?.weapons.map((x) => [
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
