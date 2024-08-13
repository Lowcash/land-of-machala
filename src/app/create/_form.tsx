'use client'

import { useForm } from 'react-hook-form'
import { MutationInput } from '@/lib/utils'
import { Profession, Race } from '@prisma/client'
import { useCreatePlayerMutation } from '@/data/player'

import { Option } from '@/components/option'
import { Button } from '@/components/ui/button'
import { Form as UIForm, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { PROFESSIONS, RACES } from '@/const'

type Values = MutationInput<typeof useCreatePlayerMutation>

export default function Form() {
  const createPlayerMutation = useCreatePlayerMutation()

  const form = useForm<Values>({
    defaultValues: {
      race: Race.HUMAN,
      profession: Profession.WARRIOR,
    },
  })

  const handleSubmitForm = (values: Values) => createPlayerMutation.mutate(values)

  return (
    <UIForm {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className='gap-8'>
        <FormField
          control={form.control}
          name='race'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profese</FormLabel>
              <FormControl>
                <Option
                  value={field.value}
                  options={RACES as any}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='profession'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profese</FormLabel>
              <FormControl>
                <Option
                  value={field.value}
                  options={PROFESSIONS as any}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant='warning'>Vytvořit charakter</Button>
      </form>
    </UIForm>
  )
}