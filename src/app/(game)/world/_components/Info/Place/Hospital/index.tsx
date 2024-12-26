'use client'

import React from 'react'
import { loc } from '@/localization'
import {
  useHealMutation,
  useHospitalQuery,
  useResurectMutation,
  useAcceptEnemySlainQuestMutation,
  useCompleteEnemySlainQuestMutation,
} from '@/hooks/api/useHospital'
import { useInfoQuery } from '@/hooks/api/useGame'

import { H3, Text } from '@/styles/text-server'
import { Card } from '@/styles/common-server'
import { Button } from '@/components/ui/button'
import Alert from '@/components/alert'
import Potions from './Potions'

export default function Hospital() {
  const gameInfoQuery = useInfoQuery()

  const hospitalId = gameInfoQuery.data?.place?.hospital?.id!
  const hospitalQuery = useHospitalQuery({ hospitalId })

  const healMutation = useHealMutation()
  const resurectMutation = useResurectMutation()

  const acceptEnemySlainQuestMutation = useAcceptEnemySlainQuestMutation()
  const completeEnemySlainQuestMutation = useCompleteEnemySlainQuestMutation()

  const handleHeal = () => healMutation.mutate({ hospitalId })
  const handleResurect = () => resurectMutation.mutate()

  const handleAcceptEnemySlainQuest = () => acceptEnemySlainQuestMutation.mutate()
  const handleCompleteEnemySlainQuest = () => completeEnemySlainQuestMutation.mutate()

  const isDefeated = !!gameInfoQuery.data?.defeated

  return (
    <>
      <Text>
        {loc.place.your_are_in} <b>{hospitalQuery.data?.name}</b>
      </Text>
      <Text>{hospitalQuery.data?.description}</Text>

      {isDefeated && (
        <Text>
          {loc.place.hospital.resurrect_description}
          <Button variant='destructive' onClick={handleResurect}>
            {loc.place.hospital.resurrect_accept}
          </Button>
        </Text>
      )}

      {!isDefeated && (
        <>
          {healMutation.isIdle && (
            <Text>
              {loc.place.hospital.heal_for}&nbsp;
              <b>
                {hospitalQuery.data?.price ?? 0} {loc.common.currency}
              </b>
              &nbsp;
              <Button variant='destructive' onClick={handleHeal}>
                {loc.place.hospital.heal_accept}
              </Button>
            </Text>
          )}
          {!healMutation.isIdle && (
            <Alert>{healMutation.isSuccess ? loc.place.hospital.heal_success : loc.place.hospital.heal_failed}</Alert>
          )}

          {acceptEnemySlainQuestMutation.isSuccess && <Alert>{loc.quest.enemy_slain.accepted}</Alert>}

          {hospitalQuery.data?.slainEnemyQuest.state === 'READY' && (
            <Text>
              {loc.quest.enemy_slain.description_hospital}&nbsp;
              <Button variant='warning' onClick={handleAcceptEnemySlainQuest}>
                {loc.quest.enemy_slain.accept}
              </Button>
            </Text>
          )}

          {completeEnemySlainQuestMutation.isSuccess && <Alert>{loc.quest.enemy_slain.completed_looted}</Alert>}

          {hospitalQuery.data?.slainEnemyQuest.state === 'COMPLETE' && (
            <Text>
              {loc.quest.enemy_slain.completed}:{' '}
              <b>
                {hospitalQuery.data.slainEnemyQuest.reward} {loc.common.currency}
              </b>
              &nbsp;
              <Button variant='warning' onClick={handleCompleteEnemySlainQuest}>
                {loc.quest.enemy_slain.complete}
              </Button>
            </Text>
          )}

          <Card.Inner>
            <H3>{loc.potion.buy}</H3>
            <Potions />
          </Card.Inner>
        </>
      )}
    </>
  )
}
