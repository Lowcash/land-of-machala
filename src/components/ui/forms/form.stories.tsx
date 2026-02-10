import type { Meta } from '@storybook/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  FormRoot,
  FormInput,
  FormCheckbox,
} from './form'
import { Button } from '../core/button'
import { Card } from '../core/card'

const meta: Meta = {
  title: 'Forms/Form',
  tags: ['autodocs'],
}

export default meta

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  agree: z.boolean().refine(val => val === true, {
    message: "You must accept the terms of the realm."
  })
})

export const SimplifiedExample = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        agree: false,
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Card>
        <Card.Content>
          <FormRoot form={form} onSubmit={onSubmit}>
            <FormInput
              control={form.control}
              name="username"
              label="Character Name"
              placeholder="Enter your name..."
            />
            <FormInput
              control={form.control}
              name="email"
              label="Email Scroll"
              placeholder="messenger@realm.com"
            />
            <FormCheckbox
              control={form.control}
              name="agree"
              label="I agree to the laws of Machala"
            />
            <Button type="submit">Submit Decree</Button>
          </FormRoot>
        </Card.Content>
      </Card>
    )
  }
}
