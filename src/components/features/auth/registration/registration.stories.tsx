import type { Meta, StoryObj } from '@storybook/react'

import AuthLayout from '@/app/(auth)/layout'

import { RegistrationCard } from './card'
import { RegistrationForm } from './form'
import { RegistrationView } from './view'

const meta: Meta<typeof RegistrationView> = {
  title: 'Features/Auth/Registration',
  component: RegistrationView,
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

export const FullPage: Story = {
  parameters: {
    layout: 'fullscreen',
  },
}

export const FormOnly: StoryObj<typeof RegistrationForm> = {
  render: () => <RegistrationForm />,
}

export const CardOnly: StoryObj<typeof RegistrationCard> = {
  render: () => <RegistrationCard />,
}
