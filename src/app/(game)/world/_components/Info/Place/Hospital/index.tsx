'use client'

import React from 'react'
import {
  useHealMutation,
  useHospitalQuery,
  useResurectMutation,
  useAcceptEnemySlainQuestMutation,
  useCompleteEnemySlainQuestMutation,
} from '@/data/hospital'
import { useGameInfoQuery } from '@/data/game'

import { H3, Text } from '@/styles/text-server'
import { Button } from '@/components/ui/button'
import Alert from '@/components/alert'
import Potions from './Potions'

export default function Hospital() {
  const gameInfoQuery = useGameInfoQuery()
  // @ts-ignore
  const hospitalQuery = useHospitalQuery({ hospitalId: gameInfoQuery.data.place.hospital.id })

  const healMutation = useHealMutation()
  const resurectMutation = useResurectMutation()

  const acceptEnemySlainQuestMutation = useAcceptEnemySlainQuestMutation()
  const completeEnemySlainQuestMutation = useCompleteEnemySlainQuestMutation()

  const handleHeal = () => {
    // @ts-ignore
    healMutation.mutate({ hospitalId: gameInfoQuery.data.place.hospital.id })
  }

  const handleAcceptEnemySlainQuest = () => acceptEnemySlainQuestMutation.mutate()
  const handleCompleteEnemySlainQuest = () => completeEnemySlainQuestMutation.mutate()

  return (
    <div className='flex flex-col'>
      <Text>
        {/* @ts-ignore */}
        Nacházíš se v <b>{hospitalQuery.data?.name}</b>
      </Text>
      <br />
      {/* @ts-ignore */}
      <Text>{hospitalQuery.data?.description}</Text>

      {healMutation.isIdle && (
        <>
          <br />
          <Text>
            Uzdravení za <b>{hospitalQuery.data?.price ?? 0} zl</b> &nbsp;
            <Button variant='destructive' onClick={handleHeal}>
              To chci!
            </Button>
          </Text>
        </>
      )}
      {!healMutation.isIdle && (
        <>
          <br />
          <Alert>
            {healMutation.isSuccess
              ? 'Teď jsi jako rybička (vyléčen)'
              : 'Bude potřeba lepšího pojištění kamaráde..tady tě vyléčit nemůžeme (nedostatek peněz)'}
          </Alert>
        </>
      )}

      {acceptEnemySlainQuestMutation.isSuccess && (
        <>
          <br />
          <Alert>Hezky pěkně, dej se do toho</Alert>
        </>
      )}

      {/* {hospitalQuery.data?.slainEnemyQuest.state === 'READY' && (
        <>
          <br />
          <br />
          <Text>
            Měl bych tu pro tebe úkol. Před bránama města se přemnožili nepřátelé, je třeba jich 10 zničit. Bohatě se ti
            odměním. Bereš? &nbsp;
            <Button variant='warning' onClick={handleAcceptEnemySlainQuest}>
              Beru
            </Button>
          </Text>
        </>
      )} */}

      {completeEnemySlainQuestMutation.isSuccess && (
        <>
          <br />
          <Alert>Super..někdy se za mnou zase stav, třeba tu pro tebe budu zase něco mít!</Alert>
        </>
      )}

      {/* {hospitalQuery.data?.slainEnemyQuest.state === 'COMPLETE' && (
        <>
          <br />
          <br />
          <Text>
            Tak to je nádhera, zde je tvoje odměna: <b>{show.data.slainEnemyQuest.reward} zl</b>&nbsp;
            <Button variant='warning' onClick={handleCompleteEnemySlainQuest}>
              Odevzdat
            </Button>
          </Text>
        </>
      )} */}

      <br />
      <H3>Koupit Potion</H3>
      <br />
      <Potions />
    </div>
  )
}
