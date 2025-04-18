'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import { toast } from '@/hooks/use-toast'
import { signIn as userSignIn } from 'next-auth/react'
import { signUp as userSignUp } from '@/app/actions/user'
import { useNavigate } from '@/hooks/use-navigate'
import { type PlayerSignSchema, playerSignSchema } from '@/zod-schema/player'

import Form, { Handle as FormHandle } from '@/components/Form'

export default function LoginForm() {
  const formRef = React.useRef<FormHandle>(null)
  const formValueRef = React.useRef<PlayerSignSchema>(null)

  const { navigate } = useNavigate()

  const handleFormChange = (data: PlayerSignSchema) => {
    formValueRef.current = data
  }

  const handleSignIn = async () => {
    const result = await userSignIn('credentials', {
      redirect: false,
      callbackUrl: '',
      email: formValueRef.current?.email,
      password: formValueRef.current?.password,
    })

    if (!!result?.ok) {
      toast({ description: i18n.t('sign.in_success') })
      navigate()
    } else {
      toast({ description: i18n.t('sign.in_error'), variant: 'destructive' })
    }
  }

  const handleSignUp = () => {
    formRef.current?.submit?.()
  }

  const handleSignUpSuccess = async () => {
    toast({ description: i18n.t('sign.up_success') })
    formRef.current?.reset?.()
    navigate()
  }

  const handleSignUpError = async () => {
    toast({ description: i18n.t('sign.up_error'), variant: 'destructive' })
    navigate()
  }

  return (
    <Form
      ref={formRef}
      className='gap-6'
      schema={playerSignSchema}
      action={userSignUp}
      onForm={{ onChange: handleFormChange }}
      onAction={{ onSuccess: handleSignUpSuccess, onError: handleSignUpError }}
    >
      <div>
        <Form.Input<PlayerSignSchema> id='email' type='email' label={i18n.t('player.email')} autoComplete='email' />
        <Form.Input<PlayerSignSchema>
          id='password'
          type='password'
          label={i18n.t('player.password')}
          autoComplete='current-password'
        />
      </div>

      <hr />

      <div className='flex flex-col gap-4'>
        <Form.Button variant='secondary' onClick={handleSignIn}>
          {i18n.t('sign.in')}
        </Form.Button>
        <Form.Button onClick={handleSignUp}>{i18n.t('sign.up')}</Form.Button>
      </div>
    </Form>
  )
}
