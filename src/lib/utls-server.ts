import { cookies } from 'next/headers'

import { PAGE_COOKIE_KEY, type Route } from '@/const'

export function isServer() {
  return typeof window == 'undefined'
}

export function getServerPage(): Route {
  return (cookies().get(PAGE_COOKIE_KEY)?.value as Route) || 'WORLD'
}
