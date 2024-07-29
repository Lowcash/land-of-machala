'use server'

import { redirect as nextRedirect } from 'next/navigation'

export async function redirect(p: Parameters<typeof nextRedirect>[0]) {
  nextRedirect(p)
}
