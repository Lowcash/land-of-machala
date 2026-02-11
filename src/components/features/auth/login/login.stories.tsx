import type { Meta, StoryObj } from '@storybook/react'

import AuthLayout from '@/app/(auth)/layout'

import { LoginCard } from './card'
import { LoginForm } from './form'
import { LoginView } from './view'

const meta: Meta<typeof LoginView> = {
  title: 'Features/Auth/Login',
  component: LoginView,
  decorators: [
    (Story) => (
      <AuthLayout>
        <Story />
      </AuthLayout>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginView>

export const FullPage: Story = {
  parameters: {
    layout: 'fullscreen',
  },
}

export const FormOnly: StoryObj<typeof LoginForm> = {
  render: () => <LoginForm />,
}

export const CardOnly: StoryObj<typeof LoginCard> = {
  render: () => <LoginCard />,
}
