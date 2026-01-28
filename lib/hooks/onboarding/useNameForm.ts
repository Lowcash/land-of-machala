'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import type { CharacterClass, CharacterRace } from '@prisma/client'
import { useForm } from 'react-hook-form'

import { createCharacterAction } from '@/lib/actions/character'
import { type Class, RANDOM_NAMES, type Race } from '@/lib/game/onboarding'

import {
  type NameValues,
  nameSchema,
} from '@/components/features/Auth/Onboarding/Creation/nameSchema'
import { useNotification } from '@/components/providers/NotificationProvider'

export function useNameForm(race: Race, characterClass: Class) {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [isPending, startTransition] = useTransition()

  const form = useForm<NameValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  })

  const randomizeName = () => {
    const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)] || 'Hero'
    form.setValue('name', randomName, { shouldValidate: true })
  }

  const onSubmit = (values: NameValues) => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [, err] = await createCharacterAction({
          name: values.name.trim(),
          race: race.toUpperCase() as CharacterRace, // Assuming Race type matches or needs UpperCase
          class: characterClass.toUpperCase() as CharacterClass,
        })

        if (err) {
          showNotification({
            variant: 'error',
            title: 'Chyba vytváření postavy',
            description: err.message || 'Nepodařilo se vytvořit postavu',
          })
          return
        }

        showNotification({
          variant: 'success',
          title: 'Postava vytvořena!',
          description: `Vítej v zemi Machala, ${values.name}!`,
        })

        // Short delay for user to see success
        setTimeout(() => router.push('/game'), 500)
      } catch (error) {
        console.error('Character creation error:', error)
        showNotification({
          variant: 'error',
          title: 'Chyba',
          description: 'Došlo k chybě při vytváření postavy',
        })
      }
    })
  }

  return {
    form,
    isPending,
    randomizeName,
    handleSubmit: form.handleSubmit(onSubmit),
  }
}
