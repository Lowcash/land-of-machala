import type { Meta, StoryObj } from '@storybook/react'

import { RegistrationBenefits } from './registration.benefits'
import { RegistrationCard } from './registration.card'
import { RegistrationForm } from './registration.form'
import { RegistrationView } from './registration.view'

const meta: Meta<typeof RegistrationView> = {
  title: 'Features/Auth/Registration',
  component: RegistrationView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RegistrationView>

export const FullPage: Story = {}

export const FormOnly: StoryObj<typeof RegistrationForm> = {
  render: () => <RegistrationForm />,
}

export const CardOnly: StoryObj<typeof RegistrationCard> = {
  render: () => <RegistrationCard />,
}

export const BenefitsOnly: StoryObj<typeof RegistrationBenefits> = {
  render: () => <RegistrationBenefits />,
}
