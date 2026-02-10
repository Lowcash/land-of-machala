import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from './badge'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'default',
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

export const SecondaryLargeWithBadge: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    children: (
      <>
        <span>Profile</span>
        <Badge variant="secondary">3</Badge>
      </>
    ),
  },
}
