import type { Meta, StoryObj } from '@storybook/react'

import { LoginCard } from '@/components/features/auth/login.card'
import { LoginForm } from '@/components/features/auth/login.form'
import { LoginView } from '@/components/features/auth/login.view'

const meta: Meta<typeof LoginView> = {
  title: 'Examples/Login Page',
  component: LoginView,
}

export default meta
type Story = StoryObj<typeof LoginView>

export const CardOnly: Story = {
  render: () => <LoginCard />,
}

export const FormOnly: Story = {
  render: () => <LoginForm />,
}

export const FullPage: Story = {
  render: () => <LoginView />,
}
