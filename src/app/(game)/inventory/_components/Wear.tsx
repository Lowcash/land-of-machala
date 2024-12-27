'use client'

import { usePlayerQuery } from '@/hooks/api/usePlayer'
import { useWearMutation } from '@/hooks/api/useWearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { FaCheck } from 'react-icons/fa'

interface Props extends MutationInput<typeof useWearMutation> {}

export default function Wear(p: Props) {
  const playerQuery = usePlayerQuery()
  const wearMutation = useWearMutation()

  return (
    <Button variant='secondary' disabled={playerQuery.data?.isInCombat} onClick={() => wearMutation.mutate(p)}>
      <FaCheck />
    </Button>
  )
}
