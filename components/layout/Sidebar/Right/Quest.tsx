'use client'

import { useNavigate } from '@/hooks/use-navigate'

import { RxListBullet } from 'react-icons/rx'
import { Button } from '@/components/ui/button'

import { ROUTE } from '@/config'

export default function Quest() {
  const { navigate } = useNavigate()

  return (
    <Button onClick={() => navigate(ROUTE.QUEST)} variant='secondary' size='icon'>
      <RxListBullet />
    </Button>
  )
}
