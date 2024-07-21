'use client'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function () {
  return <Button onClick={() => signIn('discord')} variant={'warning'}>Sign in</Button>
}
