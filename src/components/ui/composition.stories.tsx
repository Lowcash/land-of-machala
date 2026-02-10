import type { Meta } from '@storybook/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from './forms/form'
import { Input } from './forms/input'
import { Card } from './core/card'
import { Button } from './core/button'
import { Heading, Text } from './core/typography'
import { Checkbox } from './forms/checkbox'

const meta: Meta = {
  title: 'Composition/Forms',
}

export default meta

const authSchema = z.object({
  email: z.string().email('Tis not a valid scroll address!'),
  password: z.string().min(8, 'Secret must be at least 8 runes long.'),
  remember: z.boolean(),
})

type AuthFormValues = z.infer<typeof authSchema>

export const AuthFormExample = () => {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  function onSubmit(values: AuthFormValues) {
    console.log(values)
  }

  return (
    <Card className="max-w-md w-full" variant="primary">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 tracking-tight">
          <Heading level="h3">Join the Realm</Heading>
          <Text variant="muted">Enter your credentials to begin the quest.</Text>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Form.Field
              control={form.control}
              name="email"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Email Scroll</Form.Label>
                  <Form.Control>
                    <Input placeholder="messenger@realm.com" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Secret Runes</Form.Label>
                  <Form.Control>
                    <Input type="password" placeholder="********" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            
            <Form.Field
              control={form.control}
              name="remember"
              render={({ field }) => (
                <Form.Item className="flex flex-row items-start space-x-3 space-y-0">
                  <Form.Control>
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange((e.target as HTMLInputElement).checked)}
                    />
                  </Form.Control>
                  <div className="space-y-1 leading-none">
                    <Form.Label>Remember my journey</Form.Label>
                  </div>
                </Form.Item>
              )}
            />

            <Button type="submit">Unlock the Gates</Button>
          </form>
        </Form>
      </div>
    </Card>
  )
}
