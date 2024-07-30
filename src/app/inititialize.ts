import { revalidateTag } from 'next/cache'

import { CACHE_KEY } from '@/const'

let initialized = false

export function initialize() {
  if (initialized) return

  console.log('Revalidating cache...')
  revalidateTag(CACHE_KEY.ARMORS)
  initialized = true
}
