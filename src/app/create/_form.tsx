'use client'

import { loc } from '@/local'
import useNavigate from '@/hooks/useNavigate'
import { useForm } from 'react-hook-form'
import type { MutationInput } from '@/lib/utils'
import { Profession, Race } from '@prisma/client'
import { useCreatePlayerMutation } from '@/hooks/api/usePlayer'

import Option from '@/components/option'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { PROFESSIONS, RACES } from '@/const'

type Values = MutationInput<typeof useCreatePlayerMutation>

export default function CreateForm() {
  const navigate = useNavigate()

  const createPlayerMutation = useCreatePlayerMutation({
    onSuccess: () => {
      navigate()
    },
  })

  const form = useForm<Values>({
    defaultValues: {
      race: Race.HUMAN,
      profession: Profession.WARRIOR,
    },
  })

  const handleSubmitForm = (values: Values) => createPlayerMutation.mutate(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='race'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{loc.player.race}</FormLabel>
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
              <FormLabel>{loc.player.profession}</FormLabel>
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

        <Button className='w-full' variant='warning'>
          {loc.create.submit}
        </Button>
      </form>
    </Form>
  )
}
