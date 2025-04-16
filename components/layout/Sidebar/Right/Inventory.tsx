'use client'

import { useNavigate } from '@/hooks/use-navigate'

import { RxBackpack } from 'react-icons/rx'
import { Button } from '@/components/ui/button'

import { ROUTE } from '@/config'

export default function Inventory() {
  const { navigate } = useNavigate()

  return (
    <Button onClick={() => navigate(ROUTE.INVENTORY)} variant='secondary' size='icon'>
      <RxBackpack />
    </Button>
  )
}
