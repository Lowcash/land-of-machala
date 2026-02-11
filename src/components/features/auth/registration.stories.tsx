import type { Meta, StoryObj } from '@storybook/react'
import { RegistrationView } from './registration.view'
import { RegistrationForm } from './registration.form'
import { RegistrationCard } from './registration.card'
import { RegistrationBenefits } from './registration.benefits'

const meta: Meta<typeof RegistrationView> = {
  title: 'Features/Auth/Registration',
  component: RegistrationView,
  parameters: {
    layout: 'fullscreen',
  },
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
