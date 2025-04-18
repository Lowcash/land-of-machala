'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'
import { useWearableWearMutation } from '@/hooks/api/use-wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { RxCheck } from 'react-icons/rx'

interface Props extends MutationInput<typeof useWearableWearMutation> {}

export default function Wear(p: Props) {
  const playerQuery = usePlayerShowQuery()
  const wearMutation = useWearableWearMutation()

  return (
    <Button variant='secondary' disabled={playerQuery.data?.isInCombat} onClick={() => wearMutation.mutate(p)}>
      <RxCheck />
    </Button>
  )
}
