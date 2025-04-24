'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useHospitalShowQuery, type HospitalPotion } from '@/hooks/api/use-hospital'

import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

interface Props {
  hospitalId: string

  onBuyPotion: (potion: HospitalPotion) => void
}

export default function Potions({ hospitalId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const hospitalShowQuery = useHospitalShowQuery({ hospitalId })

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.efficiency ?? 'potion_efficiency' },
        { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'potion_price' },
        { className: 'text-right', content: commonShowQuery.data?.text.buy ?? 'potion_buy' },
      ]}
      cells={hospitalShowQuery.data?.potions_hospital?.map((x) => [
        { className: 'text-left', content: x.potion.name },
        {
          className: 'text-center',
          content: x.potion.text.efficiency ?? 'potion_efficiency',
        },
        {
          className: 'text-right',
          content: <Text>{x.potion.text.price ?? 'potion_price'}</Text>,
        },
        {
          className: 'text-right',
          content: (
            <Button variant='secondary' onClick={() => p.onBuyPotion?.(x)}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}
