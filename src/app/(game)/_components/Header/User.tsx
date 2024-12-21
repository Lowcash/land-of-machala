'use client'

import { signOut } from 'next-auth/react'

import { PersonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

export default function User() {
  return (
    <Button size='icon' onClick={() => signOut()}>
      <PersonIcon className={styles.icon} />

      <span className={styles.signOut}>Sign out</span>
    </Button>
  )
}

const styles = {
  icon: 'absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
  signOut: 'sr-only',
}
