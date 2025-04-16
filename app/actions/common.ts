'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { PAGE_COOKIE_KEY, type Route } from '@/config'

export const navigate = async (...args: Parameters<typeof redirect>) => redirect(...args)

export const getPage = async () => ((await cookies()).get(PAGE_COOKIE_KEY)?.value as Route) || 'WORLD'
