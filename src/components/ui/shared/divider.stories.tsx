import type { Meta, StoryObj } from '@storybook/react'

import { Divider } from './divider'

const meta: Meta<typeof Divider> = {
  title: 'Shared/Divider',
  component: Divider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      /*
        Full-width container prevents the divider from collapsing in
        Storybook's centered layout. max-w-xs keeps it visually bounded.
      */
      <div className="flex w-64 flex-col items-center justify-center py-10">
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
    label: 'or',
  },
}

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
}
