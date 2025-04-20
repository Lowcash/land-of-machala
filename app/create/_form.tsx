'use client'

import React from 'react'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from '@/hooks/use-navigate'

import { type PlayerCreateSchema, playerCreateSchema } from '@/zod-schema/player'
import { create as userCreateAction } from '@/app/actions/user'
import { useRaceShowQuery } from '@/hooks/api/use-race'
import { useClassShowQuery } from '@/hooks/api/use-class'
import { useShowCreateQuery } from '@/hooks/api/use-player'

import Form, { Handle as FormHandle } from '@/components/Form'
import { Text } from '@/styles/typography'
import Loading from '@/components/Loading'

export default function CreateForm() {
  const showCreateQuery = useShowCreateQuery()
  const raceShowQuery = useRaceShowQuery()
  const classShowQuery = useClassShowQuery()

  const formRef = React.useRef<FormHandle>(null)

  const { navigate } = useNavigate()

  const handleSubmitAction = () => {
    formRef.current?.submit?.()
  }

  const handleSubmitActionSuccess = async () => {
    toast({ description: showCreateQuery.data?.text.createSuccess ?? 'create_success' })
    navigate()
  }

  const handleSubmitActionError = async () => {
    toast({ description: showCreateQuery.data?.text.createFailure ?? 'create_failure', variant: 'destructive' })
    navigate()
  }

  if (!showCreateQuery.data || !raceShowQuery.data || !classShowQuery.data) return <Loading />

  return (
    <Form
      ref={formRef}
      className='gap-6'
      schema={playerCreateSchema}
      action={userCreateAction}
      onAction={{ onSuccess: handleSubmitActionSuccess, onError: handleSubmitActionError }}
    >
      <div className='flex flex-col gap-4'>
        <Form.Input<PlayerCreateSchema>
          id='name'
          label={<Text dangerouslySetInnerHTML={{ __html: showCreateQuery.data?.text?.name ?? 'name' }} />}
        />
        <Form.Option<PlayerCreateSchema>
          id='raceId'
          label={<Text dangerouslySetInnerHTML={{ __html: showCreateQuery.data?.text?.race ?? 'race' }} />}
          options={Object.fromEntries(raceShowQuery.data?.map((x) => [x.id, x.name]))}
        />
        <Form.Option<PlayerCreateSchema>
          id='classId'
          label={<Text dangerouslySetInnerHTML={{ __html: showCreateQuery.data?.text?.class ?? 'class' }} />}
          options={Object.fromEntries(classShowQuery.data?.map((x) => [x.id, x.name]))}
        />
      </div>

      <hr />

      <Form.Button onClick={handleSubmitAction}>
        <span dangerouslySetInnerHTML={{ __html: showCreateQuery.data?.text.create ?? 'create' }} />
      </Form.Button>
    </Form>
  )
}
