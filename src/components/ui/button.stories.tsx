import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}

export const Loading: Story = {
  args: {
    children: 'Processing...',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Locked Action',
    disabled: true,
    loading: false,
  },
}
