'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'
import { useWearableUnwearMutation } from '@/hooks/api/use-wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { RxCross1 } from 'react-icons/rx'

interface Props extends MutationInput<typeof useWearableUnwearMutation> {}

export default function Unwear(p: Props) {
  const playerShowQuery = usePlayerShowQuery()
  const wearableUnwearMutation = useWearableUnwearMutation()

  const handleUnwear = () => wearableUnwearMutation.mutate(p)

  return (
    <Button variant='destructive' disabled={playerShowQuery.data?.hasCombat} onClick={handleUnwear}>
      <RxCross1 />
    </Button>
  )
}
