'use client'

import { useUnwearMutation } from '@/data/wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { FaCross } from 'react-icons/fa'

interface Props extends MutationInput<typeof useUnwearMutation> {}

export default function Unwear(p: Props) {
  const unwearMutation = useUnwearMutation()

  return (
    <Button variant='destructive' onClick={() => unwearMutation.mutate(p)}>
      <FaCross />
    </Button>
  )
}
