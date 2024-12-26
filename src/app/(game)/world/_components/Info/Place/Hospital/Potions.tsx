'use client'

import React from 'react'
import { loc } from '@/localization'
import type { Potion } from '@prisma/client'
import { useShowInfoQuery } from '@/hooks/api/useGame'
import { useBuyPotionMutation, useHospitalQuery } from '@/hooks/api/useHospital'

import { Text } from '@/styles/text-server'
import { Button } from '@/components/ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import Table from '@/components/table'
import Alert from '@/components/alert'

type PotionItem = Potion & { price: number }

export default function Potions() {
  const gameInfoQuery = useShowInfoQuery()

  const hospitalId = gameInfoQuery?.data?.place?.hospital?.id!
  const hospitalQuery = useHospitalQuery({ hospitalId })

  const buyPotionMutation = useBuyPotionMutation()

  const handleBuyPotion = (potion: PotionItem) => buyPotionMutation.mutate({ hospitalId, potionId: potion.id })

  const potions = React.useMemo(
    () => hospitalQuery.data?.potions_hospital.map((x) => ({ ...x.potion, potionId: x.id, price: x.price })),
    [hospitalQuery.data?.potions_hospital],
  )

  const hasBuyPotions = (potions?.length ?? 0) > 0

  if (!hasBuyPotions) return <></>

  return (
    <>
      {!buyPotionMutation.isIdle && (
        <Alert>{buyPotionMutation.isSuccess ? loc.potion.buy_success : loc.potion.buy_failed}</Alert>
      )}

      <Table
        columns={[
          {},
          { className: 'text-center', content: loc.potion.efficiency },
          { className: 'text-right', content: loc.common.price },
          { className: 'text-right', content: loc.common.buy },
        ]}
        cells={potions?.map((x) => [
          { className: 'text-left', content: x.name },
          {
            className: 'text-center',
            content: `+${x.hp_gain} ${loc.common.hp}`,
          },
          {
            className: 'text-right',
            content: (
              <Text>
                {x.price} {loc.common.currency}
              </Text>
            ),
          },
          {
            className: 'text-right',
            content: (
              <Button variant='secondary' onClick={() => handleBuyPotion(x)}>
                <PaperPlaneIcon />
              </Button>
            ),
          },
        ])}
      />
    </>
  )
}
