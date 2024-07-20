import React from 'react'
import { api } from '@/trpc/react'

import { H3, Text } from '@/styles/text'
import { Button } from '../../ui/button'
import { Alert } from '../../alert'
import { Loading } from '@/components/loading'
import { Potions } from './potion'
import type { PotionItem } from './potion'

type Props = {
  id: string
  defeated?: boolean
}

export function Hospital(p: Props) {
  const { player, game, hospital } = api.useUtils()
  const show = api.hospital.show.useQuery({ hospitalId: p.id })
  const resurect = api.hospital.resurect.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })
  const heal = api.hospital.heal.useMutation({
    onSettled: () => {
      player.info.invalidate()
    },
  })
  const buy = api.hospital.buy.useMutation({
    onSettled: () => {
      player.info.invalidate()
    },
  })
  const acceptSlainEnemyQuest = api.hospital.acceptSlainEnemyQuest.useMutation({
    onSettled: () => {
      hospital.show.invalidate()
    },
  })
  const completeSlainEnemyQuest = api.hospital.completeSlainEnemyQuest.useMutation({
    onSettled: () => {
      hospital.show.invalidate()
      player.info.invalidate()
    },
  })

  const handleHeal = React.useCallback(() => heal.mutate({ hospitalId: p.id }), [p.id, heal])
  const handleResurect = React.useCallback(() => resurect.mutate(), [p.id, resurect])
  const handleAcceptSlainEnemyQuest = React.useCallback(
    () => acceptSlainEnemyQuest.mutate(),
    [p.id, acceptSlainEnemyQuest],
  )
  const handleCompleteSlainEnemyQuest = React.useCallback(
    () => completeSlainEnemyQuest.mutate(),
    [p.id, completeSlainEnemyQuest],
  )

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
      {p.defeated && (
        <Text>
          Kamaráde..moc toho z tebe teda nezbylo..něco s tím provedeme! Snad máš dobré pojištění..
          <Button variant='destructive' onClick={handleResurect}>
            Uzdravit!
          </Button>
        </Text>
      )}
      {!p.defeated && (
        <>
          <Text>{show.data?.subdescription}</Text>
          <br />
          <br />
          {heal.data?.success === undefined && (
            <Text>
              Uzdravení za <b>{show.data?.price ?? 0} zl</b> &nbsp;
              <Button variant='destructive' onClick={handleHeal}>
                To chci!
              </Button>
            </Text>
          )}

          <br />
          <br />

          {acceptSlainEnemyQuest.isSuccess && <Alert>Hezky pěkně, dej se do toho</Alert>}

          {show.data?.slainEnemyQuest.state === 'READY' && (
            <Text>
              Měl bych tu pro tebe úkol. Před bránama města se přemnožili nepřátelé, je třeba jich 10 zničit. Bohatě se
              ti odměním. Bereš? &nbsp;
              <Button variant='warning' onClick={handleAcceptSlainEnemyQuest}>
                Beru
              </Button>
            </Text>
          )}

          {completeSlainEnemyQuest.isSuccess && (
            <Alert>Super..někdy se za mnou zase stav, třeba tu pro tebe budu zase něco mít!</Alert>
          )}

          {show.data?.slainEnemyQuest.state === 'COMPLETE' && (
            <Text>
              Tak to je nádhera, zde je tvoje odměna: <b>{show.data.slainEnemyQuest.reward} zl</b>&nbsp;
              <Button variant='warning' onClick={handleCompleteSlainEnemyQuest}>
                Odevzdat
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
              <H3>Koupit Potion</H3>
              <Potions potions={potions!} onAction={handlePotionAction} />
            </>
          )}
        </>
      )}
    </>
  )
}
