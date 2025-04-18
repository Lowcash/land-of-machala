'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'
import { useWearableUnwearMutation } from '@/hooks/api/use-wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { RxCross1 } from 'react-icons/rx'

interface Props extends MutationInput<typeof useWearableUnwearMutation> {}

export default function Unwear(p: Props) {
  const playerQuery = usePlayerShowQuery()
  const unwearMutation = useWearableUnwearMutation()

  return (
    <Button
      variant='destructive'
      disabled={playerQuery.data?.isInCombat}
      onClick={() => unwearMutation.mutate(p)}
    >
      <RxCross1 />
    </Button>
  )
}
