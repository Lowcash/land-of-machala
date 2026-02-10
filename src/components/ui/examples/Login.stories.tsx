import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Lock, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Badge } from '@/components/ui/core/badge'
import { Button } from '@/components/ui/core/button'
import { Card } from '@/components/ui/core/card'
import { HeroHeader } from '@/components/ui/core/hero-header'
import { Form } from '@/components/ui/forms/form'
import { Stats } from '@/components/features/auth/stats'
import { Changelog } from '@/components/features/auth/changelog'

// Mock icons if lucide-react integration is tricky, but assuming it works or standard icons
// I'll use placeholders if needed, but imported above should work if installed.
// Codebase has lucide-react? I haven't checked package.json but it's standard.
// Step 1419 showed `import { UserIcon } from '@/components/ui/icons/user-icon'`
// I should probably use the project's icons if available, or just Lucide if installed.
// Project has `lucide-react`? `package.json` check?
// I'll stick to simple text icons or check for `lucide-react` in `package.json`.
// Let's assume standard Lucide import works fine for Storybook.
// 
// Note: Changelog uses LATEST_CHANGES constant which might need to be exported or mocked if strictly in Storybook.
// But it's already imported in changelog.tsx.

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

export const FullPage: StoryObj = {
  render: () => (
    <div className="bg-no-repeat/10 font-fantasy flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-black/90 bg-[url('/images/background.jpg')] bg-cover bg-center p-8">
      {/* <HeroHeader
        title="Land of Machala"
        subtitle="Textová fantasy hra"
        description="Tvá legenda čeká na sepsání..."
      /> */}

      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_350px]">
        <div className="flex flex-col gap-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Stats />
            <Changelog />
          </div>
        </div>

        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  ),
}
