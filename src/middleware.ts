import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

import { ROUTE } from '@/const'

let initialized = false

export default function middleware(request: NextRequest) {
  if (!initialized) {
    console.log('Initializing cache revalidation...')
    revalidatePath('/', 'layout')
    initialized = true
  }

  const url = request.nextUrl

  const response = NextResponse.redirect(new URL('/', request.url))

  if (url.pathname.startsWith(ROUTE.WORLD)) response.cookies.set('page', ROUTE.WORLD)
  if (url.pathname.startsWith(ROUTE.QUEST)) response.cookies.set('page', ROUTE.QUEST)
  if (url.pathname.startsWith(ROUTE.INVENTORY)) response.cookies.set('page', ROUTE.INVENTORY)

  return response
}

export const config = {
  matcher: ['/world', '/quest', '/inventory'],
}
