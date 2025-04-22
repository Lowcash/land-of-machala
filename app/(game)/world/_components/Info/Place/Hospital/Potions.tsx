'use client'

import type { Potion } from '@prisma/client'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useHospitalBuyPotionMutation, useHospitalShowQuery } from '@/hooks/api/use-hospital'

import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'
import Alert from '@/components/Alert'

type PotionItem = Potion & { price: number }

interface Props {
  hospitalId: string
}

export default function Potions({ hospitalId }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const hospitalShowQuery = useHospitalShowQuery({ hospitalId })

  const buyPotionMutation = useHospitalBuyPotionMutation()

  const handleBuyPotion = (potion: PotionItem) => buyPotionMutation.mutate({ hospitalId, potionId: potion.id })

  const potions = hospitalShowQuery?.data?.potions_hospital.map((x) => ({
    ...x.potion,
    potionId: x.id,
    price: x.price,
  }))

  const hasBuyPotions = (potions?.length ?? 0) > 0

  if (!hasBuyPotions) return <></>

  return (
    <>
      {!buyPotionMutation.isIdle && (
        <Alert>
          {buyPotionMutation.isSuccess
            ? (hospitalShowQuery.data?.text.potion.buy_success ?? 'potion_buy_success')
            : (hospitalShowQuery.data?.text.potion.buy_failure ?? 'buy_failure')}
        </Alert>
      )}

      <Table
        columns={[
          {},
          { className: 'text-center', content: commonShowQuery.data?.text.efficiency ?? 'potion_efficiency' },
          { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'potion_price' },
          { className: 'text-right', content: commonShowQuery.data?.text.buy ?? 'potion_buy' },
        ]}
        cells={potions?.map((x) => [
          { className: 'text-left', content: x.name },
          {
            className: 'text-center',
            content: x.text.efficiency ?? 'potion_efficiency',
          },
          {
            className: 'text-right',
            content: <Text>{x.text.price ?? 'potion_price'}</Text>,
          },
          {
            className: 'text-right',
            content: (
              <Button variant='secondary' onClick={() => handleBuyPotion(x)}>
                <RxPaperPlane />
              </Button>
            ),
          },
        ])}
      />
    </>
  )
}
