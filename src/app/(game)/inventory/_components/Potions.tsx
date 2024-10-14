'use client'

import { useShowInventoryQuery } from '@/hooks/inventory'

import Table from '@/components/table'
import Drink from './Drink'

export default function Potions() {
  const showInventory = useShowInventoryQuery()

  return (
    <Table
      columns={[{}, { className: 'text-center', content: 'Účinnost' }, { className: 'text-right', content: 'Použít' }]}
      cells={showInventory.data?.potions.map((x) => [
        { className: 'text-left', content: x.potion.name },
        {
          className: 'text-center',
          content: `+${x.potion.hp_gain} HP`,
        },
        {
          className: 'text-right',
          content: <Drink inventoryPotionId={x.id} />,
        },
      ])}
    />
  )
}
