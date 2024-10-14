'use client'

import useNavigate from '@/hooks/useNavigate'

import { Button } from '@/components/ui/button'

import { ROUTE } from '@/const'

interface Props {
  className?: string
}

export default function Quest({ children, ...p }: React.PropsWithChildren<Props>) {
  const navigate = useNavigate()

  const handleQuestClick = () => navigate(ROUTE.QUEST)

  return (
    <Button className={p.className} onClick={handleQuestClick} variant='warning' size='iconLg'>
      {children}
    </Button>
  )
}
