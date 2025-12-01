'use client'

import { useNavigate } from '@/hooks/use-navigate'

import { RxBackpack } from 'react-icons/rx'
import { Button } from '@/components/ui/button'

import { ROUTE } from '@/config'

export default function Inventory() {
  const { navigate } = useNavigate()

  return (
    <Button size='icon' onClick={() => navigate(ROUTE.INVENTORY)}>
      <RxBackpack className='h-[1rem] w-[1rem] transition-all' />
    </Button>
  )
}
