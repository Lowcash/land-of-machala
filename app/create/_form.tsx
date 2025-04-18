'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from '@/hooks/use-navigate'

import { type PlayerCreateSchema, playerCreateSchema } from '@/zod-schema/player'
import { create as userCreateAction } from '@/app/actions/user'
import { useRaceShowQuery } from '@/hooks/api/use-race'
import { useClassShowQuery } from '@/hooks/api/use-class'

import Form, { Handle as FormHandle } from '@/components/Form'
import Loading from '@/components/Loading'

export default function CreateForm() {
  const raceShowQuery = useRaceShowQuery()
  const classAllQuery = useClassShowQuery()

  const formRef = React.useRef<FormHandle>(null)

  const { navigate } = useNavigate()

  const handleSubmitAction = () => formRef.current?.submit?.()

  const handleSubmitActionSuccess = async () => {
    toast({ description: i18n.t('sign.create_character_success') })
    navigate()
  }

  const handleSubmitActionError = async () => {
    toast({ description: i18n.t('sign.create_character_error'), variant: 'destructive' })
    navigate()
  }

  if (!raceShowQuery.data || !classAllQuery.data) return <Loading />

  return (
    <Form
      ref={formRef}
      className='gap-6'
      schema={playerCreateSchema}
      action={userCreateAction}
      onAction={{ onSuccess: handleSubmitActionSuccess, onError: handleSubmitActionError }}
    >
      <div className='flex flex-col gap-4'>
        <Form.Input<PlayerCreateSchema> id='name' label={i18n.t('player.name')} />
        <Form.Option<PlayerCreateSchema>
          id='raceId'
          label={i18n.t('player.race')}
          options={Object.fromEntries(raceShowQuery.data?.map((x) => [x.id, x.name]))}
        />
        <Form.Option<PlayerCreateSchema>
          id='classId'
          label={i18n.t('player.character')}
          options={Object.fromEntries(classAllQuery.data?.map((x) => [x.id, x.name]))}
        />
      </div>

      <hr />

      <Form.Button onClick={handleSubmitAction}>{i18n.t('sign.create_character')}</Form.Button>
    </Form>
  )
}
