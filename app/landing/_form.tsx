'use client'

import React from 'react'
import { toast } from '@/hooks/use-toast'
import { signIn as userSignIn } from 'next-auth/react'
import { signUp as userSignUp } from '@/app/actions/user'
import { useNavigate } from '@/hooks/use-navigate'
import { useUserShowLandingQuery } from '@/hooks/api/use-user'
import { type UserSignSchema, userSignSchema } from '@/zod-schema/user'

import Form, { Handle as FormHandle } from '@/components/Form'
import { Text } from '@/styles/typography'
import Loading from '@/components/Loading'

const DEFAULT_SIGN_DATA: UserSignSchema = { email: '', password: '' }

export default function LoginForm() {
  const [formData, setFormData] = React.useState<UserSignSchema>(DEFAULT_SIGN_DATA)

  const showLandingQuery = useUserShowLandingQuery()

  const formRef = React.useRef<FormHandle>(null)

  const { navigate } = useNavigate()

  const handleFormChange = (data: UserSignSchema) => {
    setFormData(data)
  }

  const handleSignIn = async () => {
    const result = await userSignIn('credentials', {
      redirect: false,
      callbackUrl: '',
      email: formData?.email,
      password: formData?.password,
    })

    if (!!result?.ok) {
      toast({ description: showLandingQuery.data?.text.signInSuccess ?? 'sign_in_success' })
      navigate()
    } else {
      toast({ description: showLandingQuery.data?.text.signInFailure ?? 'sign_in_failure', variant: 'destructive' })
    }
  }

  const handleSignUp = () => {
    formRef.current?.submit?.()
  }

  const handleSignUpSuccess = async () => {
    toast({ description: showLandingQuery.data?.text.signUpSuccess ?? 'sign_up_success' })
    navigate()

    setFormData(DEFAULT_SIGN_DATA)
  }

  const handleSignUpError = async () => {
    toast({ description: showLandingQuery.data?.text.signUpFailure ?? 'sign_up_failure', variant: 'destructive' })
    navigate()
  }

  if (!showLandingQuery.data) return <Loading />

  return (
    <Form
      data={formData}
      ref={formRef}
      className='gap-6'
      schema={userSignSchema}
      action={userSignUp}
      onForm={{ onChange: handleFormChange }}
      onAction={{ onSuccess: handleSignUpSuccess, onError: handleSignUpError }}
    >
      <div>
        <Form.Input<UserSignSchema>
          id='email'
          type='email'
          label={<Text dangerouslySetInnerHTML={{ __html: showLandingQuery.data?.text?.email ?? 'sign_email' }} />}
          autoComplete='email'
        />
        <Form.Input<UserSignSchema>
          id='password'
          type='password'
          label={
            <Text dangerouslySetInnerHTML={{ __html: showLandingQuery.data?.text?.password ?? 'sign_password' }} />
          }
          autoComplete='current-password'
        />
      </div>

      <hr />

      <div className='flex flex-col gap-4'>
        <Form.Button variant='secondary' onClick={handleSignIn}>
          <span dangerouslySetInnerHTML={{ __html: showLandingQuery.data?.text.signIn ?? 'sign_in' }} />
        </Form.Button>
        <Form.Button onClick={handleSignUp}>
          <span dangerouslySetInnerHTML={{ __html: showLandingQuery.data?.text.signUp ?? 'sign_up' }} />
        </Form.Button>
      </div>
    </Form>
  )
}
