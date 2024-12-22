'use client'

import { loc } from '@/local'

import { Button } from '@/components/ui/button'

interface Props {
  error: Error
  reset: () => void
}

export default function Error(p: Props) {
  return (
    <>
      {loc.error.header}: {p.error.message || loc.error.something_went_wrong}{' '}
      <Button onClick={p.reset}>{loc.error.try_again}</Button>
    </>
  )
}
