'use client'

import { Button } from '@/components/ui/button'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <>
      Error: {error.message || 'Something went wrong'} <Button onClick={reset}>Try again</Button>
    </>
  )
}
