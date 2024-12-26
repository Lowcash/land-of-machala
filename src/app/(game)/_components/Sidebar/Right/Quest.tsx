'use client'

import useNavigate from '@/hooks/useNavigate'

import { FaTasks } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

import { ROUTE } from '@/const'

export default function Quest() {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(ROUTE.QUEST)} variant='secondary' size='icon'>
      <FaTasks />
    </Button>
  )
}
