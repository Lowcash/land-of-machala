import type { Meta, StoryObj } from '@storybook/react'

import { IconBadge } from './icon-badge'
import { UserIcon } from './icons/user-icon'
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

export const DefaultWithIcon: Story = {
  args: {
    children: 'Profile Settings',
    icon: <UserIcon />,
  },
}

export const SecondaryLargeWithBadge: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    children: 'Warrior Class Select',
    icon: <IconBadge variant="outline-secondary">A</IconBadge>,
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
  },
}

