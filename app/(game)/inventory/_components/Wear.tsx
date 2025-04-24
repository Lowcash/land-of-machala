'use client'

import { useGameShowInfoQuery } from '@/hooks/api/use-game'
import { useWearableWearMutation } from '@/hooks/api/use-wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { RxCheck } from 'react-icons/rx'

interface Props extends MutationInput<typeof useWearableWearMutation> {}

export default function Wear(p: Props) {
  const gameShowInfoQuery = useGameShowInfoQuery()

  const wearableWearMutation = useWearableWearMutation()

  const handleWear = () => wearableWearMutation.mutate(p)

  return (
    <Button variant='secondary' disabled={gameShowInfoQuery.derived.hasCombat} onClick={handleWear}>
      <RxCheck />
    </Button>
  )
}
