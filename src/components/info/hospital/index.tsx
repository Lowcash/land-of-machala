import React from 'react'
import { api } from '@/trpc/react'

import { Text } from '@/styles/text'
import { Button } from '../../ui/button'
import { Alert } from '../../alert'
import { Loading } from '@/components/loading'
import { Potions } from './potion'
import type { PotionItem } from './potion'

type Props = {
  id: string
}

export function Hospital(p: Props) {
  const { player } = api.useUtils()
  const show = api.hospital.show.useQuery({ hospitalId: p.id })
  const heal = api.hospital.heal.useMutation({
    onSuccess: () => {
      player.info.invalidate()
    },
  })
  const buy = api.hospital.buy.useMutation({
    onSettled: () => {
      player.info.invalidate()
    },
  })

  const handleHeal = React.useCallback(() => {
    if (!p.id) return

    heal.mutate({ hospitalId: p.id })
  }, [heal, p.id])

  const handlePotionAction = React.useCallback(
    (potion: PotionItem) => buy.mutate({ hospitalId: p.id, potionId: potion.id }),
    [p.id, buy],
  )

  const potions = React.useMemo(
    () => show.data?.potions_hospital.map((x) => ({ ...x.potion, armoryWeaponId: x.id, price: x.price })),
    [show.data?.potions_hospital],
  )

  if (show.isLoading) return <Loading />
  if (!show.data) return <></>

  const hasBuyPotions = (potions?.length ?? 0) > 0

  return (
    <>
      Nacházíš se v <b>{show.data?.name}</b>
      <br />
      <Text>{show.data?.description}</Text>
      <br />
      <br />
      <Text>{show.data?.subdescription}</Text>
      <br />
      <br />
      {heal.data?.success === undefined && (
        <Text>
          Uzdravení za <b>{show.data?.price ?? 0}</b> zlaťáků{' '}
          <Button variant='destructive' onClick={handleHeal}>
            To chci!
          </Button>
        </Text>
      )}
      {heal.data?.success !== undefined && (
        <Alert>
          {heal.data?.success
            ? 'Teď jsi jako rybička (vyléčen)'
            : 'Bude potřeba lepšího pojištění kamaráde..tady tě vyléčit nemůžeme (nedostatek peněz)'}
        </Alert>
      )}
      {hasBuyPotions && (
        <>
          <br />
          <br />
          <Text>Koupit Potion</Text>
          <br />
          <Potions potions={potions!} onAction={handlePotionAction} />
        </>
      )}
    </>
  )
}
