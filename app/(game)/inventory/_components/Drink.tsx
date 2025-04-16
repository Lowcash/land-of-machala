'use client'

import { useWearableDrinkMutation } from '@/hooks/api/use-wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'

interface Props extends MutationInput<typeof useWearableDrinkMutation> {}

export default function Drink(p: Props) {
  const drinkMutation = useWearableDrinkMutation()

  return (
    <Button variant='secondary' onClick={() => drinkMutation.mutate(p)}>
      <RxPaperPlane />
    </Button>
  )
}
