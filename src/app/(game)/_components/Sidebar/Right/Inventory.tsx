'use client'

import useNavigate from '@/hooks/useNavigate'

import { FaBriefcase } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

import { ROUTE } from '@/const'

export default function Inventory() {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(ROUTE.INVENTORY)} variant='warning' size='iconLg'>
      <FaBriefcase />
    </Button>
  )
}
