'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import type { CharacterClass, CharacterRace } from '@prisma/client'
import { Dice5, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { createCharacterAction } from '@/lib/actions/character'
import type { Class, Race } from '@/lib/game/onboarding'
import { RANDOM_NAMES } from '@/lib/game/onboarding'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'

import { AuthInput } from '../../Shared/AuthInput'
import { type NameValues, nameSchema } from './nameSchema'

interface NameFormProps {
  race: Race
  characterClass: Class
}

export function NameForm({ race, characterClass }: NameFormProps) {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<NameValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  })

  const randomizeName = () => {
    const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)] || 'Hero'
    setValue('name', randomName, { shouldValidate: true })
  }

  const onSubmit = (values: NameValues) => {
    if (isPending) return

    startTransition(async () => {
      try {
        const [, err] = await createCharacterAction({
          name: values.name.trim(),
          race: race.toUpperCase() as CharacterRace,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="font-fantasy text-game-gold text-2xl tracking-wide">
          Pojmenuj svého hrdinu
        </h2>
        <p className="text-game-copper-muted">Každá legenda začíná jménem.</p>
      </div>

      <div className="flex gap-2">
        <div className="grow">
          <AuthInput
            id="name"
            label="Jméno postavy"
            placeholder="Např. Gandalf, Aragorn..."
            icon={Sparkles}
            disabled={isPending}
            {...register('name')}
            error={errors.name?.message}
          />
        </div>
        <div className="flex flex-col justify-end">
          <Button
            onClick={randomizeName}
            variant="outline"
            size="icon"
            className="border-game-copper hover:border-game-gold hover:text-game-gold mb-[2px] h-10 w-10 border-2 bg-black/60 text-[#d4a574]"
            title="Náhodné jméno"
            type="button"
            disabled={isPending}
          >
            <Dice5 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        loading={isPending}
        disabled={!isValid}
        variant="game-primary"
        className="font-fantasy w-full text-lg"
      >
        Vstoupit do světa
      </Button>
    </form>
  )
}
