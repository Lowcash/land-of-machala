import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '@/components/ui/core/stack'

import AuthLayout from '@/app/(auth)/layout'

import { LoginCard } from './card'
import { LoginForm } from './form'
import { LoginView } from './view'

const meta: Meta<typeof LoginView> = {
  title: 'Features/Auth/Login',
  component: LoginView,
  parameters: {
    layout: 'fullscreen',
  },
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

export const FullPage: Story = {}

export const FormOnly: StoryObj<typeof LoginForm> = {
  render: () => (
    /* Mimicking the left column structure from view.tsx */
    <VStack gap="md" fullWidth>
      <VStack gap="md" pb="md" fullWidth>
        <LoginForm />
      </VStack>
    </VStack>
  ),
}

export const CardOnly: StoryObj<typeof LoginCard> = {
  render: () => (
    /* Mimicking the left column structure from view.tsx */
    <VStack gap="md" fullWidth>
      <VStack gap="md" pb="md" fullWidth>
        <LoginCard />
      </VStack>
    </VStack>
  ),
}
