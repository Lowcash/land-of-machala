'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import {
  useHospitalShowQuery,
  useHospitalHealMutation,
  useHospitalResurectMutation,
  useHospitalAcceptEnemySlainQuestMutation,
  useHospitalCompleteEnemySlainQuestMutation,
} from '@/hooks/api/use-hospital'
import { useGameInfoShowQuery } from '@/hooks/api/use-game'

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
  const gameInfoShowQuery = useGameInfoShowQuery()
  const hospitalShowQuery = useHospitalShowQuery({ hospitalId })

  const healMutation = useHospitalHealMutation()
  const resurectMutation = useHospitalResurectMutation()

  const acceptEnemySlainQuestMutation = useHospitalAcceptEnemySlainQuestMutation()
  const completeEnemySlainQuestMutation = useHospitalCompleteEnemySlainQuestMutation()

  const handleHeal = () => healMutation.mutate({ hospitalId })
  const handleResurect = () => resurectMutation.mutate({ hospitalId })

  const handleAcceptEnemySlainQuest = () => acceptEnemySlainQuestMutation.mutate()
  const handleCompleteEnemySlainQuest = () => completeEnemySlainQuestMutation.mutate()

  if (gameInfoShowQuery.isLoading || hospitalShowQuery.isLoading) return <Loading position='local' />

  return (
    <>
      <Text dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.header ?? '' }} />
      <Text dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.description ?? '' }} />

      {!!gameInfoShowQuery.data?.defeated ? (
        // player defaeted scenario
        <Text>
          <Button variant='destructive' onClick={handleResurect}>
            {i18n.t('place.main_city_hospital.resurrect_accept')}
          </Button>
        </Text>
      ) : (
        // player common scenario
        <>
          {healMutation.isIdle && (
            <div className='flex items-center'>
              <Text dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.healing?.header ?? '' }} />
              &nbsp;
              <Button variant='destructive' onClick={handleHeal}>
                {hospitalShowQuery.data?.text?.healing?.button}
              </Button>
            </div>
          )}
          {!healMutation.isIdle && (
            <Alert>
              {healMutation.isSuccess
                ? i18n.t('place.main_city_hospital.heal_success')
                : i18n.t('place.main_city_hospital.heal_failed')}
            </Alert>
          )}

          {acceptEnemySlainQuestMutation.isSuccess && <Alert>{i18n.t('quest.slain_enemy.accepted')}</Alert>}

          {hospitalShowQuery.data?.slainEnemyQuest.state === 'READY' && (
            <Text>
              {i18n.t('quest.slain_enemy.description_hospital')}&nbsp;
              <Button variant='warning' onClick={handleAcceptEnemySlainQuest}>
                {i18n.t('quest.slain_enemy.accept')}
              </Button>
            </Text>
          )}

          {completeEnemySlainQuestMutation.isSuccess && <Alert>{i18n.t('quest.slain_enemy.completed_looted')}</Alert>}

          {hospitalShowQuery.data?.slainEnemyQuest.state === 'COMPLETE' && (
            <Text>
              {i18n.t('quest.slain_enemy.completed')}:{' '}
              <b>
                {hospitalShowQuery.data?.slainEnemyQuest.reward} {i18n.t('common.currency')}
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
