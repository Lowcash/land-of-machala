import type { Meta, StoryObj } from '@storybook/react'
import { IconBadge } from './icon-badge'

const meta: Meta<typeof IconBadge> = {
  title: 'UI/IconBadge',
  component: IconBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IconBadge>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '1',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'A',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'G',
  },
}


export const OutlineSecondary: Story = {
  args: {
    variant: 'outline-secondary',
    children: 'S',
  },
}
