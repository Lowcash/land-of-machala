'use client'

import { useUnwearMutation } from '@/hooks/api/useWearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { FaTimes } from 'react-icons/fa'

interface Props extends MutationInput<typeof useUnwearMutation> {}

export default function Unwear(p: Props) {
  const unwearMutation = useUnwearMutation()

  return (
    <Button variant='destructive' onClick={() => unwearMutation.mutate(p)}>
      <FaTimes />
    </Button>
  )
}
