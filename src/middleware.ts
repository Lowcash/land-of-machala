import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

import { ROUTE } from '@/const'

let initialized = false

export default function middleware(request: NextRequest) {
  // if (!initialized) {
  //   console.log('Initializing cache revalidation...')
  //   revalidatePath('/', 'layout')
  //   initialized = true
  // }

  const response = NextResponse.redirect(new URL('/', request.url))

  if (request.nextUrl.pathname.startsWith(ROUTE.WORLD)) response.cookies.set('page', 'WORLD')
  if (request.nextUrl.pathname.startsWith(ROUTE.QUEST)) response.cookies.set('page', 'QUEST')
  if (request.nextUrl.pathname.startsWith(ROUTE.INVENTORY)) response.cookies.set('page', 'INVENTORY')

  return response
}

export const config = {
  matcher: ['/world', '/quest', '/inventory'],
}
