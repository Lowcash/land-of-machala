'use client'

import useNavigate from '@/hook/useNavigate'

import { Button } from '@/components/ui/button'

import { ROUTE } from '@/const'

export default async function Page() {
  const navigate = useNavigate()

  const handleBackClick = () => navigate(ROUTE.WORLD)

  return (
    <>
      <Button onClick={handleBackClick}>Back</Button>Quest
    </>
  )
}
