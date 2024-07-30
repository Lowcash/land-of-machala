import { revalidatePath } from 'next/cache'

let initialized = false

export function initialize() {
  if (initialized) return

  console.log('Revalidating cache...')
  revalidatePath('/', 'layout')
  initialized = true
}
