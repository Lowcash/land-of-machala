'use client'

import { useGameShowInfoQuery, useGameLootMutation } from '@/hooks/api/use-game'

import { Button } from '@/components/ui/button'

export default function Loot() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  const lootMutation = useGameLootMutation()

  const handleLoot = () => lootMutation.mutate()

  return (
    <div className='flex justify-between'>
      <Button variant='destructive' onClick={handleLoot}>
        {gameShowInfoQuery.data?.loot?.text?.loot ?? 'game_loot'}
      </Button>
    </div>
  )
}
