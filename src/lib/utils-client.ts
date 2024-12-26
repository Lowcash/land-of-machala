'use client'

import Cookies from 'js-cookie'

import { PAGE_COOKIE_KEY, type Route } from '@/const'

export function isClient() {
  return typeof window !== 'undefined'
}

export function getClientPage(): Route | undefined {
  if (typeof window === 'undefined') return undefined

  return (Cookies.get(PAGE_COOKIE_KEY) as Route) ?? 'WORLD'
}
