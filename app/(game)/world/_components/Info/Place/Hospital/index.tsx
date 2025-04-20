'use client'

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
      <Text dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.header ?? 'hospital_header' }} />
      <Text dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.description ?? 'hospital_description' }} />

      {!!gameInfoShowQuery.data?.defeated ? (
        // player defaeted scenario
        <Text>
          <Button variant='destructive' onClick={handleResurect}>
            {hospitalShowQuery.data?.text?.resurrect.action ?? 'hospital_resurrect_action'}
          </Button>
        </Text>
      ) : (
        // player common scenario
        <>
          {healMutation.isIdle && (
            <div className='flex items-center'>
              <Text dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.heal?.header ?? '' }} />
              &nbsp;
              <Button variant='destructive' onClick={handleHeal}>
                {hospitalShowQuery.data?.text?.heal?.action ?? 'hospital_heal_action'}
              </Button>
            </div>
          )}
          {!healMutation.isIdle && (
            <Alert>
              {healMutation.isSuccess
                ? (hospitalShowQuery.data?.text?.heal.success ?? 'hospital_heal_success')
                : (hospitalShowQuery.data?.text?.heal.failure ?? 'hospital_heal_failure')}
            </Alert>
          )}

          {acceptEnemySlainQuestMutation.isSuccess && (
            <Alert>{hospitalShowQuery.data?.text.quest.enemySlain.accepted ?? 'hospital_quest_accepted'}</Alert>
          )}

          {hospitalShowQuery.data?.slainEnemyQuest.state === 'READY' && (
            <Text>
              {hospitalShowQuery.data?.text.quest.enemySlain.description ?? 'hospital_quest_description'}&nbsp;
              <Button variant='warning' onClick={handleAcceptEnemySlainQuest}>
                {hospitalShowQuery.data?.text.quest.enemySlain.accept ?? 'hospital_quest_accept'}
              </Button>
            </Text>
          )}

          {completeEnemySlainQuestMutation.isSuccess && (
            <Alert>{hospitalShowQuery.data?.text.quest.enemySlain.looted ?? 'hospital_quest_looted'}</Alert>
          )}

          {hospitalShowQuery.data?.slainEnemyQuest.state === 'COMPLETE' && (
            <div className='flex items-center'>
              <Text
                dangerouslySetInnerHTML={{
                  __html: hospitalShowQuery.data?.text.quest.enemySlain.completed ?? 'hospital_quest_completed',
                }}
              />
              <Button variant='warning' onClick={handleCompleteEnemySlainQuest}>
                {hospitalShowQuery.data?.text.quest.enemySlain.complete ?? 'hospital_quest_complete_action'}
              </Button>
            </div>
          )}

          <Card.Inner>
            <H3>{hospitalShowQuery.data?.text.potion.buy ?? 'hospital_potion_buy'}</H3>
            <Potions hospitalId={hospitalId} />
          </Card.Inner>
        </>
      )}
    </>
  )
}
