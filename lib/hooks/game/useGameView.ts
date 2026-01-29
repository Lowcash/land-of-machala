'use client'

import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { View } from '@/lib/types/game'

const VALID_VIEWS: View[] = ['town', 'smith', 'bank', 'healer', 'tavern', 'market']

export function useGameView(initialView: View = 'town') {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get view from URL or fallback to initialView
  const viewParam = searchParams.get('view') as View
  const currentView = VALID_VIEWS.includes(viewParam) ? viewParam : initialView

  const goToView = useCallback(
    (view: View) => {
      const params = new URLSearchParams(searchParams)
      params.set('view', view)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.push(`${pathname}?${params.toString()}` as any)
    },
    [searchParams, pathname, router]
  )

  const goBack = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.delete('view')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.push(`${pathname}?${params.toString()}` as any)
  }, [searchParams, pathname, router])

  return {
    currentView,
    goToView,
    goBack,
  }
}
