'use client'

import { loc } from '@/lib/localization'
import { useNavigate } from '@/hooks/use-navigate'

import { Button } from '@/components/ui/button'
import { RxChevronLeft } from 'react-icons/rx'

import { ROUTE } from '@/config'

export default function Back() {
  const { navigate } = useNavigate()

  const handleBackClick = () => navigate(ROUTE.WORLD)

  return (
    <>
      <Button size={'shrink-sm'} onClick={handleBackClick}>
        <RxChevronLeft />
        &nbsp;{loc.common.back_world}
      </Button>
    </>
  )
}
