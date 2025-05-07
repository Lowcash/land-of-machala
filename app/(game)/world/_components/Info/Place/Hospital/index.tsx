'use client'

import React from 'react'
import {
  useHospitalShowQuery,
  useHospitalHealMutation,
  useHospitalResurectMutation,
  useHospitalAcceptEnemySlainQuestMutation,
  useHospitalCompleteEnemySlainQuestMutation,
  useHospitalBuyPotionMutation,
} from '@/hooks/api/use-hospital'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import Alert from '@/components/Alert'
import Loading from '@/components/Loading'
import Info from '@/components/app/Info'
import Decision, { type DecisionItem, type DecisionSelectedEvent } from '@/components/app/Decision'
import Potions, { type BuyPotionEvent, type PotionsLeaveEvent } from '@/components/app/Potions'

const SUBPLACE = {
  POTION: 'potion',
} as const

const DECISION = {
  ...SUBPLACE,
  BACK: 'back',
  HEAL: 'heal',
  RESURECT: 'resurect',
  QUEST_ACCEPT: 'quest_accept',
  QUEST_COMPLETE: 'quest_complete',
} as const

interface Props {
  hospitalId: string

  onHospitalLeave?: () => void
}

export default function Hospital({ hospitalId, ...p }: Props) {
  const [subplace, setSubplace] = React.useState<(typeof SUBPLACE)[keyof typeof SUBPLACE]>()
  const [message, setMessage] = React.useState<string>()

  const commonShowQuery = useCommonShowQuery()
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

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.BACK:
        p.onHospitalLeave?.()
        break
      case DECISION.HEAL:
        healMutation.mutate({ hospitalId })
        break
      case DECISION.RESURECT:
        resurectMutation.mutate({ hospitalId })
        break
      case DECISION.QUEST_ACCEPT:
        acceptEnemySlainQuestMutation.mutate()
        break
      case DECISION.QUEST_COMPLETE:
        completeEnemySlainQuestMutation.mutate()
        break
      case DECISION.POTION:
        setSubplace(SUBPLACE.POTION)
        break
    }
  }

  const handleBuyPotion: BuyPotionEvent = (potion) =>
    buyPotionMutation.mutate({ hospitalId, potionId: potion.potion_id })

  const handlePotionsLeave: PotionsLeaveEvent = () => setSubplace(undefined)

  if (subplace === SUBPLACE.POTION)
    return <Potions hospitalId={hospitalId} onBuyPotion={handleBuyPotion} onPotionsLeave={handlePotionsLeave} />

  if (gameShowInfoQuery.isLoading || hospitalShowQuery.isLoading) return <Loading position='local' />

  return (
    <>
      <Info
        header={hospitalShowQuery.data?.text?.header ?? 'hospital_header'}
        description={[
          hospitalShowQuery.data?.text?.description ?? 'hospital_description',
          gameShowInfoQuery.derived.hasDefeated
            ? (hospitalShowQuery.data?.text?.resurrect.description ?? 'hospital_resurrect_description')
            : (hospitalShowQuery.data?.text?.heal?.header ?? 'hospital_heal_header'),
          (!gameShowInfoQuery.derived.hasDefeated &&
            hospitalShowQuery.data?.slainEnemyQuest.state === 'READY' &&
            hospitalShowQuery.data?.text.quest.enemySlain.description) ??
            'hospital_quest_description',
          (!gameShowInfoQuery.derived.hasDefeated &&
            hospitalShowQuery.data?.slainEnemyQuest.state === 'COMPLETE' &&
            hospitalShowQuery.data?.text.quest.enemySlain.completed) ??
            'hospital_quest_completed',
        ].filter(Boolean)}
      />

      {message && (
        <Alert>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      )}

      <Decision
        return={{
          key: DECISION.BACK,
          text: commonShowQuery.data?.text.cityBack ?? 'hospital_city_back',
        }}
        decisions={
          (
            [
              gameShowInfoQuery.derived.hasDefeated && {
                key: DECISION.RESURECT,
                text: hospitalShowQuery.data?.text?.resurrect.action ?? 'hospital_resurrect_action',
              },
              {
                key: DECISION.QUEST_ACCEPT,
                text: hospitalShowQuery.data?.text?.quest?.enemySlain.accept ?? 'hospital_quest_accept',
              },
              {
                key: DECISION.QUEST_COMPLETE,
                text: hospitalShowQuery.data?.text?.quest?.enemySlain.complete ?? 'hospital_quest_complete',
              },
              {
                key: DECISION.HEAL,
                text: hospitalShowQuery.data?.text?.heal?.action ?? 'hospital_heal_action',
              },
              {
                key: DECISION.POTION,
                text: hospitalShowQuery.data?.text?.potion.buy ?? 'hospital_potion',
              },
            ] as (DecisionItem | undefined)[]
          ).filter(Boolean) as DecisionItem[]
        }
        onDecisionSelected={handleDecisionSelected}
      />

      {/* {!!gameShowInfoQuery.derived.hasDefeated ? (
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
      )} */}
    </>
  )
}
