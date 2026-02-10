import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Core/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'P',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'S',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'O',
  },
}

export const OutlineSecondary: Story = {
  args: {
    variant: 'outline-secondary',
    children: 'S',
  },
}
