'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import type { Potion } from '@prisma/client'
import { useHospitalBuyPotionMutation, useHospitalQuery } from '@/hooks/api/use-hospital'

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
  const hospitalQuery = useHospitalQuery({ hospitalId })

  const buyPotionMutation = useHospitalBuyPotionMutation()

  const handleBuyPotion = (potion: PotionItem) => buyPotionMutation.mutate({ hospitalId, potionId: potion.id })

  const potions = hospitalQuery?.data?.potions_hospital.map((x) => ({ ...x.potion, potionId: x.id, price: x.price }))

  const hasBuyPotions = (potions?.length ?? 0) > 0

  if (!hasBuyPotions) return <></>

  return (
    <>
      {!buyPotionMutation.isIdle && (
        <Alert>
          {buyPotionMutation.isSuccess ? i18n.t('consumable.buy_success') : i18n.t('consumable.buy_failed')}
        </Alert>
      )}

      <Table
        columns={[
          {},
          { className: 'text-center', content: i18n.t('consumable.efficiency') },
          { className: 'text-right', content: i18n.t('common.price') },
          { className: 'text-right', content: i18n.t('common.buy') },
        ]}
        cells={potions?.map((x) => [
          { className: 'text-left', content: x.i18n_key },
          {
            className: 'text-center',
            content: `+${x.hp_gain} ${i18n.t('common.hp')}`,
          },
          {
            className: 'text-right',
            content: (
              <Text>
                {x.price} {i18n.t('common.currency')}
              </Text>
            ),
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
