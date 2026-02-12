import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '@/components/ui/core/stack'

import AuthLayout from '@/app/(auth)/layout'

import { RegistrationCard } from './card'
import { RegistrationForm } from './form'
import { RegistrationView } from './view'

const meta: Meta<typeof RegistrationView> = {
  title: 'Features/Auth/Registration',
  component: RegistrationView,
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
type Story = StoryObj<typeof RegistrationView>

export const FullPage: Story = {}

export const FormOnly: StoryObj<typeof RegistrationForm> = {
  render: () => (
    /* Mimicking the left column structure from view.tsx */
    <VStack gap="md" fullWidth>
      <VStack gap="md" pb="md" fullWidth>
        <RegistrationForm />
      </VStack>
    </VStack>
  ),
}

export const CardOnly: StoryObj<typeof RegistrationCard> = {
  render: () => (
    /* Mimicking the left column structure from view.tsx */
    <VStack gap="md" fullWidth>
      <VStack gap="md" pb="md" fullWidth>
        <RegistrationCard />
      </VStack>
    </VStack>
  ),
}
