'use client'

import { useNavigate } from '@/hooks/use-navigate'
import { useCommonShowQuery } from '@/hooks/api/use-common'

import { Button } from '@/components/ui/button'
import { RxChevronLeft } from 'react-icons/rx'

import { ROUTE } from '@/config'

export default function Back() {
  const commonShowQuery = useCommonShowQuery()

  const { navigate } = useNavigate()

  const handleBackClick = () => navigate(ROUTE.WORLD)

  return (
    <>
      <Button size={'shrink-sm'} onClick={handleBackClick}>
        <RxChevronLeft />
        &nbsp;{commonShowQuery.data?.text.worldBack ?? 'world_back'}
      </Button>
    </>
  )
}
