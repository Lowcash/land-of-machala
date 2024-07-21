'use client'

import { signIn } from 'next-auth/react'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function () {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <Image priority src={`/images/icon.png`} alt={'icon'} width={500} height={500} className='mt-auto ml-auto mr-auto' />
      <Button className='w-40' onClick={() => signIn('discord')} variant={'warning'}>
        Sign in
      </Button>
    </div>
  )
}
