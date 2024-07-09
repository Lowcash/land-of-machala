import type { Potion } from '@prisma/client'

import { Table } from '@/components/table'
import { Text } from '@/styles/text'
import { Button } from '../../ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export type PotionItem = Potion & { price: number }

type WeaponMarketProps = {
  potions: PotionItem[]

  onAction?: (potion: PotionItem) => void
}

export function Potions(p: WeaponMarketProps) {
  return (
    <Table
      columns={[{}, { className: 'text-center', content: 'Účinnost' }, { className: 'text-right', content: 'Koupit' }]}
      cells={p.potions.map((x) => [
        { className: 'text-left', content: x.name },
        {
          className: 'text-center',
          content: `+${x.hp_gain} HP`,
        },
        {
          className: 'text-right',
          content: (
            <>
              <Text>{x.price} zlaťáků</Text>
              &nbsp;
              <Button variant='secondary' onClick={() => p.onAction?.(x)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}
