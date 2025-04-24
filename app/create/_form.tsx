'use client'

import React from 'react'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from '@/hooks/use-navigate'
import { useRaceShowQuery } from '@/hooks/api/use-race'
import { useClassShowQuery } from '@/hooks/api/use-class'
import { usePlayerShowCreateQuery } from '@/hooks/api/use-player'
import { type PlayerCreateSchema, playerCreateSchema } from '@/zod-schema/player'

import * as PlayerAction from '@/app/actions/player'

import Form, { Handle as FormHandle } from '@/components/Form'
import { Text } from '@/styles/typography'
import Loading from '@/components/Loading'

export default function CreateForm() {
  const playerShowCreateQuery = usePlayerShowCreateQuery()
  const raceShowQuery = useRaceShowQuery()
  const classShowQuery = useClassShowQuery()

  const formRef = React.useRef<FormHandle>(null)

  const { navigate } = useNavigate()

  const handleSubmitAction = () => {
    formRef.current?.submit?.()
  }

  const handleSubmitActionSuccess = async () => {
    toast({ description: playerShowCreateQuery.data?.text.createSuccess ?? 'create_success' })
    navigate()
  }

  const handleSubmitActionFailure = async () => {
    toast({ description: playerShowCreateQuery.data?.text.createFailure ?? 'create_failure', variant: 'destructive' })
    navigate()
  }

  if (!playerShowCreateQuery.data || !raceShowQuery.data || !classShowQuery.data) return <Loading />

  return (
    <Form
      ref={formRef}
      className='gap-6'
      schema={playerCreateSchema}
      action={PlayerAction.create}
      onAction={{ onSuccess: handleSubmitActionSuccess, onError: handleSubmitActionFailure }}
    >
      <div className='flex flex-col gap-4'>
        <Form.Input<PlayerCreateSchema>
          id='name'
          label={<Text dangerouslySetInnerHTML={{ __html: playerShowCreateQuery.data?.text?.name ?? 'name' }} />}
        />
        <Form.Option<PlayerCreateSchema>
          id='raceId'
          label={<Text dangerouslySetInnerHTML={{ __html: playerShowCreateQuery.data?.text?.race ?? 'race' }} />}
          options={Object.fromEntries(raceShowQuery.data?.map((x) => [x.id, x.name]))}
        />
        <Form.Option<PlayerCreateSchema>
          id='classId'
          label={<Text dangerouslySetInnerHTML={{ __html: playerShowCreateQuery.data?.text?.class ?? 'class' }} />}
          options={Object.fromEntries(classShowQuery.data?.map((x) => [x.id, x.name]))}
        />
      </div>

      <hr />

      <Form.Button onClick={handleSubmitAction}>
        <span dangerouslySetInnerHTML={{ __html: playerShowCreateQuery.data?.text.create ?? 'create' }} />
      </Form.Button>
    </Form>
  )
}
