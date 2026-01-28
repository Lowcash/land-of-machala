'use client'

import { Dice5, Sparkles } from 'lucide-react'

import type { Class, Race } from '@/lib/game/onboarding'
import { useNameForm } from '@/lib/hooks/onboarding/useNameForm'

import { Button } from '@/components/ui/button'

import { AuthInput } from '../../Shared/AuthInput'

interface NameFormProps {
  race: Race
  characterClass: Class
}

export function NameForm({ race, characterClass }: NameFormProps) {
  const { form, isPending, randomizeName, handleSubmit } = useNameForm(race, characterClass)
  const {
    register,
    formState: { errors, isValid },
  } = form

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
