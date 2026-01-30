'use client'

import { Dice5, Sparkles } from 'lucide-react'

import type { Class, Race } from '@/lib/game/onboarding'
import { useCharacterRandomizer } from '@/lib/hooks/onboarding/useCharacterRandomizer'
import { useNameForm } from '@/lib/hooks/onboarding/useNameForm'

import { Button } from '@/components/ui/button'

import { AuthInput } from '../../Shared/AuthInput'

interface NameFormProps {
  race: Race
  characterClass: Class
}

export function NameForm({ race, characterClass }: NameFormProps) {
  const { form, isPending, handleSubmit } = useNameForm(race, characterClass)
  const { randomizeCharacter } = useCharacterRandomizer(form)

  const {
    register,
    formState: { errors, isValid },
  } = form

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            onClick={randomizeCharacter}
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
        variant="ghost"
        className="group relative w-full overflow-hidden rounded border border-yellow-900/50 bg-black/60 px-8 py-3 text-lg font-bold text-yellow-500 shadow-lg backdrop-blur-sm transition-all hover:border-yellow-500/50 hover:bg-yellow-900/20 hover:text-yellow-200 disabled:opacity-50"
        style={{ fontFamily: 'var(--font-medieval)' }}
      >
        <span className="relative z-10">Vstoupit do světa</span>
        <div className="absolute inset-0 z-0 bg-linear-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Button>
    </form>
  )
}
