import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Lock, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { VStack } from '@/components/ui/core/stack'
import { Button } from '@/components/ui/core/button'
import { Card } from '@/components/ui/core/card'
import { AuthHero } from '@/components/features/auth/hero'
import { Form } from '@/components/ui/forms/form'
import { Stats } from '@/components/features/auth/stats'
import { Changelog } from '@/components/features/auth/changelog'
import { AuthLayout } from '@/components/ui/shared/auth-layout'

const meta: Meta = {
  title: 'Examples/Login Page',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <div className="w-full max-w-md">
      <Card>
        <Card.Header>
          <Card.Title>Přihlášení</Card.Title>
        </Card.Header>
        <Card.Content>
          <Form.Root form={form} onSubmit={onSubmit}>
            <Form.Input
              control={form.control}
              name="username"
              label="Uživatelské jméno"
              placeholder="Gandalv..."
              leftIcon={<User className="h-4 w-4" />}
            />
            <Form.Input
              control={form.control}
              name="password"
              label="Heslo"
              type="password"
              placeholder="********"
              leftIcon={<Lock className="h-4 w-4" />}
            />
            <Button type="submit" loading={form.formState.isSubmitting}>
              Vstoupit do světa
            </Button>
          </Form.Root>
        </Card.Content>
        <Card.Footer>
          <div className="flex w-full justify-between text-xs text-(--color-secondary)">
            <a href="#" className="hover:text-(--color-primary)">
              Registrace
            </a>
            <a href="#" className="hover:text-(--color-primary)">
              Zapomenuté heslo?
            </a>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export const FullPage: Story = {
  render: () => (
    <AuthLayout>
      <VStack align="center" gap="xxl" fullWidth>
        <AuthHero />

        <div className="grid w-full gap-8 lg:grid-cols-[1fr_350px]">
          <VStack gap="xl">
            <div className="grid gap-8 md:grid-cols-2">
              <Stats />
              <Changelog />
            </div>
          </VStack>

          <VStack align="center" justify="center">
            <LoginForm />
          </VStack>
        </div>
      </VStack>
    </AuthLayout>
  ),
}
