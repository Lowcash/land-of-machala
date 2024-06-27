'use client'

import React from 'react'
import { z } from 'zod'
import { api } from '@/trpc/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profession, Race } from '@prisma/client'

import Option from '@/components/option'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { PROFESSIONS, RACES, ROUTE } from '@/const'

const SCHEMA = z.object({
  race: z.enum(RACES),
  profession: z.enum(PROFESSIONS),
})

type Values = z.infer<typeof SCHEMA>

export default function () {
  const { player } = api.useUtils()
  const create = api.player.create.useMutation({
    onSettled: () => {
      player.info.invalidate()
    },
  })

  const form = useForm<Values>({
    resolver: zodResolver(SCHEMA),
    defaultValues: {
      race: Race.HUMAN,
      profession: Profession.WARRIOR,
    },
  })

  const handleSubmitForm = React.useCallback((values: Values) => create.mutate(values), [create])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className='space-y-8'>
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

        <Button variant='outline'>Vytvořit charakter</Button>
      </form>
    </Form>
  )
}
