import type { Meta, StoryObj } from '@storybook/react'

import { MOCK_BENEFITS } from '@/lib/game/data/mocks'

import { Benefits } from './benefits'

const meta: Meta<typeof Benefits> = {
  title: 'Prefabs/Narrative/Benefits',
  component: Benefits,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Benefits>

export const Default: Story = {
  args: {
    title: 'Begin Your Adventure',
    description: 'By registering, you gain access to the World of Machala:',
    benefits: MOCK_BENEFITS,
  },
}

export const Minimal: Story = {
  args: {
    title: 'Benefits',
    description: 'By registering, you gain:',
    benefits: MOCK_BENEFITS.slice(0, 2),
    variant: 'flat',
  },
}
