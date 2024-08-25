'use client'

import { useLootMutation } from '@/data/game'

import { Button } from '@/components/ui/button'

export default function Loot() {
  const lootMutation = useLootMutation()

  const handleLoot = () => lootMutation.mutate()

  return (
    <>
      <Button variant='destructive' onClick={handleLoot}>
        Loot
      </Button>
    </>
  )
}
