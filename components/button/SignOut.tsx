'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { RxExit } from 'react-icons/rx'

export default function SignOut() {
  return (
    <Button size='icon' variant='warning' onClick={() => signOut()}>
      <RxExit className='h-[1.2rem] w-[1.2rem]' />
      <span className='sr-only'>Sign Out</span>
    </Button>
  )
}
