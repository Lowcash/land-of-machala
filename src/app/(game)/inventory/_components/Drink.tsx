'use client'

import { useDrinkMutation } from '@/data/wearable'
import type { MutationInput } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { FaPaperPlane } from 'react-icons/fa'

interface Props extends MutationInput<typeof useDrinkMutation> {}

export default function Drink(p: Props) {
  const drinkMutation = useDrinkMutation()

  return (
    <Button variant='secondary' onClick={() => drinkMutation.mutate(p)}>
      <FaPaperPlane />
    </Button>
  )
}
