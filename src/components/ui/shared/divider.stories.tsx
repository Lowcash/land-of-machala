import type { Meta, StoryObj } from '@storybook/react'

import { Divider } from './divider'

const meta: Meta<typeof Divider> = {
  title: 'Shared/Divider',
  component: Divider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      /* 
         VStack wrapper ensures we have a width container. 
         Without this, centered layout in storybook might collapse width to 0.
      */
      <div className="flex w-96 flex-col items-center justify-center py-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Nebo',
  },
}
