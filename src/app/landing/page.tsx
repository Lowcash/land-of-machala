'use client'

import { signIn } from 'next-auth/react'

import * as S from './styles'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Landing() {
  return (
    <S.Landing>
      <Image priority src={`/images/icon.png`} alt={'icon'} width={500} height={500} className={styles.image} />
      <Button className={styles.signIn} onClick={() => signIn('discord')} variant={'warning'}>
        Sign in
      </Button>
    </S.Landing>
  )
}

const styles = {
  image: 'ml-auto mr-auto mt-auto',
  signIn: 'w-40',
}
