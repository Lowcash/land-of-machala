import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Core/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Play Now',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Settings',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Locked Action',
    disabled: true,
  },
}
