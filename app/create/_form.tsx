'use client'

import React from 'react'
import { loc } from '@/lib/localization'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from '@/hooks/use-navigate'

import { type PlayerCreateSchema, playerCreateSchema } from '@/zod-schema/player'
import { create as userCreate } from '@/app/actions/user'
import { useRaceAllQuery } from '@/hooks/api/use-race'
import { useClassAllQuery } from '@/hooks/api/use-class'

import Form, { Handle as FormHandle } from '@/components/Form'

export default function CreateForm() {
  const raceAllQuery = useRaceAllQuery()
  const classAllQuery = useClassAllQuery()

  const formRef = React.useRef<FormHandle>(null)

  const { navigate } = useNavigate()

  const handleSubmitAction = () => {
    formRef.current?.submit?.()
  }

  const handleSubmitActionSuccess = async () => {
    toast({ description: loc.sign.create_character_success })
    navigate()
  }

  const handleSubmitActionError = async () => {
    toast({ description: loc.sign.create_character_error, variant: 'destructive' })
    navigate()
  }

  if (!raceAllQuery.data || !classAllQuery.data) return <></>

  return (
    <Form
      ref={formRef}
      className='gap-6'
      schema={playerCreateSchema}
      action={userCreate}
      onAction={{ onSuccess: handleSubmitActionSuccess, onError: handleSubmitActionError }}
    >
      <div className='flex flex-col gap-4'>
        <Form.Input<PlayerCreateSchema> id='name' label={loc.player.name} />
        <Form.Option<PlayerCreateSchema>
          id='raceId'
          label={loc.player.race}
          options={Object.fromEntries(raceAllQuery.data?.map((x) => [x.id, x.name]))}
        />
        <Form.Option<PlayerCreateSchema>
          id='classId'
          label={loc.player.character}
          options={Object.fromEntries(classAllQuery.data?.map((x) => [x.id, x.name]))}
        />
      </div>

      <hr />

      <Form.Button onClick={handleSubmitAction}>{loc.sign.create_character}</Form.Button>
    </Form>
  )
}
