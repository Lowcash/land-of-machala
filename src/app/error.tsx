'use client'

import { Button } from '@/components/ui/button'

interface Props {
  error: Error
  reset: () => void
}

export default function Error(p: Props) {
  return (
    <>
      Error: {p.error.message || 'Something went wrong'} <Button onClick={p.reset}>Try again</Button>
    </>
  )
}
