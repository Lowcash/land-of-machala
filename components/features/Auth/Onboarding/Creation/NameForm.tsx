'use client'

import { Dice5, Sparkles } from 'lucide-react'

import type { Class, Race } from '@/lib/game/onboarding'
import { useCharacterRandomizer } from '@/lib/hooks/onboarding/useCharacterRandomizer'
import { useNameForm } from '@/lib/hooks/onboarding/useNameForm'

import { Button } from '@/components/ui/button'
import { StandardForm } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'

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
    formState: { errors },
  } = form

  return (
    <StandardForm onSubmit={handleSubmit} gap="lg">
      <VStack gap="md">
        <AuthInput
          id="name"
          label="Jméno postavy"
          placeholder="Např. Gandalf, Aragorn..."
          icon={Sparkles}
          disabled={isPending}
          {...register('name')}
          error={errors.name?.message}
        />

        <Button
          onClick={randomizeCharacter}
          variant="secondary_game"
          fullWidth
          type="button"
          disabled={isPending}
          icon={Dice5}
          label="Náhodná postava"
        />
      </VStack>

      <Button
        type="submit"
        variant="choice"
        size="lg"
        fullWidth
        disabled={isPending || !form.getValues('name')}
        loading={isPending}
        label="Vstoupit do hry"
      />
    </StandardForm>
  )
}
