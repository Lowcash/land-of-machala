'use client'

import { signIn } from 'next-auth/react'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Landing() {
  return (
    <div className='flex flex-col items-center gap-10'>
      <Image
        priority
        src={`/images/icon.png`}
        alt={'icon'}
        width={500}
        height={500}
        className='ml-auto mr-auto mt-auto'
      />
      <Button className='w-40' onClick={() => signIn('discord')} variant={'warning'}>
        Sign in
      </Button>
    </div>
  )
}
