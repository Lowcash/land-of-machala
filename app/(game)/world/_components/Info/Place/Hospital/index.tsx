'use client'

import React from 'react'
import {
  useHospitalShowQuery,
  useHospitalHealMutation,
  useHospitalResurectMutation,
  useHospitalAcceptEnemySlainQuestMutation,
  useHospitalCompleteEnemySlainQuestMutation,
  useHospitalBuyPotionMutation,
  type HospitalPotion,
} from '@/hooks/api/use-hospital'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'

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
  const [message, setMessage] = React.useState<string>()

  const gameShowInfoQuery = useGameShowInfoQuery()
  const hospitalShowQuery = useHospitalShowQuery({ hospitalId })

  const healMutation = useHospitalHealMutation({
    onSuccess: () => setMessage(hospitalShowQuery.data?.text?.heal.success ?? 'hospital_heal_success'),
    onError: () => setMessage(hospitalShowQuery.data?.text?.heal.failure ?? 'hospital_heal_failure'),
  })
  const resurectMutation = useHospitalResurectMutation({
    onSuccess: () => setMessage(hospitalShowQuery.data?.text?.resurrect.success ?? 'hospital_resurrect_success'),
  })
  const buyPotionMutation = useHospitalBuyPotionMutation({
    onSuccess: () => setMessage(hospitalShowQuery.data?.text.potion.buy_success ?? 'potion_buy_success'),
    onError: () => setMessage(hospitalShowQuery.data?.text.potion.buy_failure ?? 'potion_buy_failure'),
  })

  const acceptEnemySlainQuestMutation = useHospitalAcceptEnemySlainQuestMutation({
    onSuccess: () => setMessage(hospitalShowQuery.data?.text.quest.enemySlain.accepted ?? 'hospital_quest_accepted'),
  })
  const completeEnemySlainQuestMutation = useHospitalCompleteEnemySlainQuestMutation({
    onSuccess: () => setMessage(hospitalShowQuery.data?.text.quest.enemySlain.looted ?? 'hospital_quest_looted'),
  })

  if (gameShowInfoQuery.isLoading || hospitalShowQuery.isLoading) return <Loading position='local' />

  const handleHeal = () => healMutation.mutate({ hospitalId })
  const handleResurect = () => resurectMutation.mutate({ hospitalId })
  const handleBuyPotion = (potion: HospitalPotion) => buyPotionMutation.mutate({ hospitalId, potionId: potion.id })

  const handleAcceptEnemySlainQuest = () => acceptEnemySlainQuestMutation.mutate()
  const handleCompleteEnemySlainQuest = () => completeEnemySlainQuestMutation.mutate()

  return (
    <>
      <div className='flex flex-col'>
        <Text dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.header ?? 'hospital_header' }} />
        <Text
          dangerouslySetInnerHTML={{ __html: hospitalShowQuery.data?.text?.description ?? 'hospital_description' }}
          small
          italic
        />
      </div>

      {!!gameShowInfoQuery.derived.hasDefeated ? (
        // player defaeted scenario
        <div className='flex items-center gap-2'>
          <Text
            dangerouslySetInnerHTML={{
              __html: hospitalShowQuery.data?.text?.resurrect.description ?? 'hospital_resurrect_description',
            }}
          />
          &nbsp;
          <Button variant='destructive' onClick={handleResurect}>
            {hospitalShowQuery.data?.text?.resurrect.action ?? 'hospital_resurrect_action'}
          </Button>
        </div>
      ) : (
        // player common scenario
        healMutation.isIdle && (
          <div className='flex items-center'>
            <Text
              dangerouslySetInnerHTML={{
                __html: hospitalShowQuery.data?.text?.heal?.header ?? 'hospital_heal_header',
              }}
            />
            &nbsp;
            <Button variant='destructive' onClick={handleHeal}>
              {hospitalShowQuery.data?.text?.heal?.action ?? 'hospital_heal_action'}
            </Button>
          </div>
        )
      )}

      {message && (
        <Alert>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      )}

      {!gameShowInfoQuery.derived.hasDefeated && (
        // player common scenario
        <>
          {hospitalShowQuery.data?.slainEnemyQuest.state === 'READY' && (
            <Text>
              {hospitalShowQuery.data?.text.quest.enemySlain.description ?? 'hospital_quest_description'}&nbsp;
              <Button variant='warning' onClick={handleAcceptEnemySlainQuest}>
                {hospitalShowQuery.data?.text.quest.enemySlain.accept ?? 'hospital_quest_accept'}
              </Button>
            </Text>
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
            <Potions hospitalId={hospitalId} onBuyPotion={handleBuyPotion} />
          </Card.Inner>
        </>
      )}
    </>
  )
}
