'use client'

import { usePlayerQuery } from '@/hooks/api/usePlayer'
import { useUnwearMutation } from '@/hooks/api/useWearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { FaTimes } from 'react-icons/fa'

interface Props extends MutationInput<typeof useUnwearMutation> {}

export default function Unwear(p: Props) {
  const playerQuery = usePlayerQuery()
  const unwearMutation = useUnwearMutation()

  return (
    <Button variant='destructive' disabled={playerQuery.data?.isInCombat} onClick={() => unwearMutation.mutate(p)}>
      <FaTimes />
    </Button>
  )
}
