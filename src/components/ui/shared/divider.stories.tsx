import type { Meta, StoryObj } from '@storybook/react'

import { StoryContainer } from '../storybook-utils'
import { Divider } from './divider'

const meta: Meta<typeof Divider> = {
  title: 'UI/Shared/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'or',
  },
}

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
}
