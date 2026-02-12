import type { Meta, StoryObj } from '@storybook/react'

import { REGISTRATION_BENEFITS } from '@/lib/game/constants/registration'

import { RegistrationBenefits } from './benefits'

const meta: Meta<typeof RegistrationBenefits> = {
  title: 'Features/Auth/Benefits',
  component: RegistrationBenefits,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RegistrationBenefits>

export const Default: Story = {
  args: {
    benefits: REGISTRATION_BENEFITS,
  },
}

export const Minimal: Story = {
  args: {
    benefits: REGISTRATION_BENEFITS,
    forceMinimal: true,
  },
}
