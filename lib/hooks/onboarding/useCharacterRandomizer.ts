'use client'

import { useTransition } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import type { UseFormReturn } from 'react-hook-form'

import { RANDOM_NAMES, classes, races } from '@/lib/game/onboarding'

import { type NameValues } from '@/components/features/Auth/Onboarding/Creation/nameSchema'

export function useCharacterRandomizer(form: UseFormReturn<NameValues>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const randomizeCharacter = () => {
    startTransition(() => {
      // 1. Pick Random Race & Class
      const randomRace = races[Math.floor(Math.random() * races.length)]
      const randomClass = classes[Math.floor(Math.random() * classes.length)]

      // 2. Pick Random Name
      const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)] || 'Hero'

      // 3. Update URL (params)
      const params = new URLSearchParams(searchParams)
      params.set('race', randomRace!.id)
      params.set('class', randomClass!.id)

      // 4. Update Form State
      form.setValue('name', randomName, { shouldValidate: true })

      // 5. Navigate (replace to keep history clean?) or push
      router.replace(`?${params.toString()}`, { scroll: false })
    })
  }

  return {
    randomizeCharacter,
    isRandomizing: isPending,
  }
}
