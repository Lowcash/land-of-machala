'use client'

import useNavigate from '@/hooks/useNavigate'

import { Button } from '@/components/ui/button'

import { ROUTE } from '@/const'

interface Props {
  className?: string
}

export default function Inventory({ children, ...p }: React.PropsWithChildren<Props>) {
  const navigate = useNavigate()

  const handleInventoryClick = () => navigate(ROUTE.INVENTORY)

  return (
    <Button className={p.className} onClick={handleInventoryClick} variant='warning' size='iconLg'>
      {children}
    </Button>
  )
}
