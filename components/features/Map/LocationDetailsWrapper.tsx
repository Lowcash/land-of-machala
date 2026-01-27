'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { LocationDetails } from './Detail/LocationDetails'
import type { Location } from './Shared/types'

interface LocationDetailsWrapperProps {
  location: Location
}

export function LocationDetailsWrapper({ location }: LocationDetailsWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('locationId')
    router.push(`?${params.toString()}`)
  }

  return <LocationDetails location={location} onCloseAction={handleClose} />
}
