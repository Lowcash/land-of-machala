'use client'

import { useNavigate } from '@/hooks/use-navigate'

import { RxListBullet } from 'react-icons/rx'
import { Button } from '@/components/ui/button'

import { ROUTE } from '@/config'

export default function Quest() {
  const { navigate } = useNavigate()

  return (
    <Button size='icon' onClick={() => navigate(ROUTE.QUEST)}>
      <RxListBullet className='h-[1.2rem] w-[1.2rem]' />
    </Button>
  )
}
