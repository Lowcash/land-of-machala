'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profession, Race } from '@prisma/client'
import { useCreatePlayerMutation } from '@/data/player/client'

// import { Card } from '@/styles/common'
import { Option } from '@/components/option'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { PROFESSIONS, RACES } from '@/const'
import { CREATE_PLAYE_SCHEMA } from '@/server/actions/player'

type Values = z.infer<typeof CREATE_PLAYE_SCHEMA>

export default function Page() {
  const createPlayerMutation = useCreatePlayerMutation()

  const form = useForm<Values>({
    resolver: zodResolver(CREATE_PLAYE_SCHEMA),
    defaultValues: {
      race: Race.HUMAN,
      profession: Profession.WARRIOR,
    },
  })

  const handleSubmitForm = (values: Values) => createPlayerMutation.mutate(values)
  
  return (
    // <Card>
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

          <Button variant='warning'>Vytvořit charakter</Button>
        </form>
      </Form>
    // </Card>
  )
}
