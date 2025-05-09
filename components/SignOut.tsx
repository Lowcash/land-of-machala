'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { RxPerson } from 'react-icons/rx'

export default function SignOut() {
  return (
    <Button size='icon' onClick={() => signOut()}>
      <RxPerson className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <RxPerson className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Sign out</span>
    </Button>
  )
}
