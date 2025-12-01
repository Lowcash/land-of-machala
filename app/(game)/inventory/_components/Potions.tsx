'use client'

import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import Table from '@/components/Table'
import { Drink } from './'

export function Potions() {
  const inventoryShowQuery = useInventoryShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: inventoryShowQuery.data?.text.efficiency ?? 'potion_efficiency' },
        { className: 'text-right', content: inventoryShowQuery.data?.text.use ?? 'potion_use' },
      ]}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Prisma result type, complex nested structure
      cells={inventoryShowQuery.data?.potions?.map((x: any) => [
        { className: 'text-left', content: x.potion.name },
        {
          className: 'text-center',
          content: x.text.gain ?? 'potion_gain',
        },
        {
          className: 'text-right',
          content: <Drink inventoryConsumableId={x.id} />,
        },
      ])}
    />
  )
}
