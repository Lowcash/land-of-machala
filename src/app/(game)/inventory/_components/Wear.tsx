'use client'

import { useWearMutation } from '@/services/hooks/wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { FaCheck } from 'react-icons/fa'

interface Props extends MutationInput<typeof useWearMutation> {}

export default function Wear(p: Props) {
  const wearMutation = useWearMutation()

  return (
    <Button variant='secondary' onClick={() => wearMutation.mutate(p)}>
      <FaCheck />
    </Button>
  )
}
