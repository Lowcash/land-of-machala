'use client'

import React from 'react'
import type { Potion } from '@prisma/client'
import { useInfoQuery } from '@/hooks/api/useGame'
import { useBuyPotionMutation, useHospitalQuery } from '@/hooks/api/useHospital'

import { Text } from '@/styles/text-server'
import { Button } from '@/components/ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import Table from '@/components/table'

type PotionItem = Potion & { price: number }

export default function Potions() {
  const gameInfoQuery = useInfoQuery()

  // @ts-ignore
  const hospitalId = gameInfoQuery?.data?.place.hospital.id
  const hospitalQuery = useHospitalQuery({ hospitalId })

  const buyPotionMutation = useBuyPotionMutation()

  const handleBuyPotion = (potion: PotionItem) => buyPotionMutation.mutate({ hospitalId, potionId: potion.id })

  const potions = React.useMemo(
    () => hospitalQuery.data?.potions_hospital.map((x) => ({ ...x.potion, armoryWeaponId: x.id, price: x.price })),
    [hospitalQuery.data?.potions_hospital],
  )

  const hasBuyPotions = (potions?.length ?? 0) > 0

  if (!hasBuyPotions) return <></>

  return (
    <Table
      columns={[{}, { className: 'text-center', content: 'Účinnost' }, { className: 'text-right', content: 'Koupit' }]}
      cells={potions?.map((x) => [
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
              <Button variant='secondary' onClick={() => handleBuyPotion(x)}>
                <PaperPlaneIcon />
              </Button>
            </>
          ),
        },
      ])}
    />
  )
}
