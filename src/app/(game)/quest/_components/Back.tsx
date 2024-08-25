'use client'

import useNavigate from '@/hook/useNavigate'

import { Button } from '@/components/ui/button'
import { FaChevronLeft } from 'react-icons/fa'

import { ROUTE } from '@/const'

export default function Back() {
  const navigate = useNavigate()

  const handleBackClick = () => navigate(ROUTE.WORLD)

  return (
    <>
      <Button onClick={handleBackClick}>
        <FaChevronLeft />
        &nbsp; Zpět do světa
      </Button>
    </>
  )
}
