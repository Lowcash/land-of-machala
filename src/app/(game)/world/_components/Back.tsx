'use client'

import { loc } from '@/localization'
import useNavigate from '@/hooks/useNavigate'

import { Button } from '@/components/ui/button'
import { FaChevronLeft } from 'react-icons/fa'

import { ROUTE } from '@/const'

export default function Back() {
  const navigate = useNavigate()

  const handleBackClick = () => navigate(ROUTE.WORLD)

  return (
    <>
      <Button size={'shrink-sm'} onClick={handleBackClick}>
        <FaChevronLeft />
        &nbsp;{loc.common.back_world}
      </Button>
    </>
  )
}
