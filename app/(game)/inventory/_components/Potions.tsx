'use client'

import { loc } from '@/lib/localization'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import Table from '@/components/table'
import Drink from './Drink'

export default function Potions() {
  const showInventory = useInventoryShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: loc.potion.efficiency },
        { className: 'text-right', content: loc.common.use },
      ]}
      cells={showInventory.data?.potions.map((x) => [
        { className: 'text-left', content: x.potion.name },
        {
          className: 'text-center',
          content: `+${x.potion.hp_gain} ${loc.common.hp}`,
        },
        {
          className: 'text-right',
          content: <Drink inventoryConsumableId={x.id} />,
        },
      ])}
    />
  )
}
