'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import {
  useHospitalQuery,
  useHospitalHealMutation,
  useHospitalResurectMutation,
  useHospitalAcceptEnemySlainQuestMutation,
  useHospitalCompleteEnemySlainQuestMutation,
} from '@/hooks/api/use-hospital'
import { useGameInfoQuery } from '@/hooks/api/use-game'

import { H3, Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import { Button } from '@/components/ui/button'
import Alert from '@/components/Alert'
import Potions from './Potions'
import Loading from '@/components/Loading'

interface Props {
  hospitalId: string
}

export default function Hospital({ hospitalId }: Props) {
  const gameInfoQuery = useGameInfoQuery()
  const hospitalQuery = useHospitalQuery({ hospitalId })

  const healMutation = useHospitalHealMutation()
  const resurectMutation = useHospitalResurectMutation()

  const acceptEnemySlainQuestMutation = useHospitalAcceptEnemySlainQuestMutation()
  const completeEnemySlainQuestMutation = useHospitalCompleteEnemySlainQuestMutation()

  const handleHeal = () => healMutation.mutate({ hospitalId })
  const handleResurect = () => resurectMutation.mutate({ hospitalId })

  const handleAcceptEnemySlainQuest = () => acceptEnemySlainQuestMutation.mutate()
  const handleCompleteEnemySlainQuest = () => completeEnemySlainQuestMutation.mutate()

  if (gameInfoQuery.isLoading || hospitalQuery.isLoading) return <Loading position='local' />

  const isDefeated = !!gameInfoQuery.data?.defeated

  return (
    <>
      <Text>
        {i18n.t('place.your_are_in')} <b>{hospitalQuery.data?.i18n_key}</b>
      </Text>
      {/* <Text>{hospitalQuery.data?.description}</Text> */}

      {isDefeated && (
        <Text>
          {i18n.t('place.main_city_hospital.resurrect_description')}
          <Button variant='destructive' onClick={handleResurect}>
            {i18n.t('place.main_city_hospital.resurrect_accept')}
          </Button>
        </Text>
      )}

      {!isDefeated && (
        <>
          {healMutation.isIdle && (
            <Text>
              {i18n.t('place.main_city_hospital.heal_for')}&nbsp;
              <b>
                {hospitalQuery?.data?.healing_price ?? 0} {i18n.t('common.currency')}
              </b>
              &nbsp;
              <Button variant='destructive' onClick={handleHeal}>
                {i18n.t('place.main_city_hospital.heal_accept')}
              </Button>
            </Text>
          )}
          {!healMutation.isIdle && (
            <Alert>
              {healMutation.isSuccess
                ? i18n.t('place.main_city_hospital.heal_success')
                : i18n.t('place.main_city_hospital.heal_failed')}
            </Alert>
          )}

          {acceptEnemySlainQuestMutation.isSuccess && <Alert>{i18n.t('quest.slain_enemy.accepted')}</Alert>}

          {hospitalQuery.data?.slainEnemyQuest.state === 'READY' && (
            <Text>
              {i18n.t('quest.slain_enemy.description_hospital')}&nbsp;
              <Button variant='warning' onClick={handleAcceptEnemySlainQuest}>
                {i18n.t('quest.slain_enemy.accept')}
              </Button>
            </Text>
          )}

          {completeEnemySlainQuestMutation.isSuccess && (
            <Alert>{i18n.t('quest.slain_enemy.completed_looted')}</Alert>
          )}

          {hospitalQuery.data?.slainEnemyQuest.state === 'COMPLETE' && (
            <Text>
              {i18n.t('quest.slain_enemy.completed')}:{' '}
              <b>
                {hospitalQuery.data?.slainEnemyQuest.reward} {i18n.t('common.currency')}
              </b>
              &nbsp;
              <Button variant='warning' onClick={handleCompleteEnemySlainQuest}>
                {i18n.t('quest.slain_enemy.complete')}
              </Button>
            </Text>
          )}

          <Card.Inner>
            <H3>{i18n.t('consumable.buy')}</H3>
            <Potions hospitalId={hospitalId} />
          </Card.Inner>
        </>
      )}
    </>
  )
}
