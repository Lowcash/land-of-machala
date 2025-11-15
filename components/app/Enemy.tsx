import React from 'react'
import Image from 'next/image'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'

export default function Enemy() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  return (
    <Image
      priority
      src={gameShowInfoQuery.data?.combat?.enemyInstance.image.src ?? 'enemy_image_src'}
      alt={gameShowInfoQuery.data?.combat?.enemyInstance?.enemy.id ?? 'enemy_id'}
      width={500}
      height={500}
      className='h-full w-1/2'
    />
  )
}
