'use client'

import i18n from '@/lib/i18n'
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
        &nbsp;{i18n.t('common.back_world')}
      </Button>
    </>
  )
}
