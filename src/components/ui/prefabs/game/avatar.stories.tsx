import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Prefabs/Game/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    name: 'Unknown Traveler',
  },
}

export const WithImage: Story = {
  args: {
    name: 'Eldrin the Wise',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Eldrin',
  },
}

export const Hero: Story = {
  args: {
    name: 'Sir Galahad',
    variant: 'hero',
    size: 'lg',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Galahad',
  },
}

export const Small: Story = {
  args: {
    name: 'Quickfoot',
    size: 'avatar-sm',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Quickfoot',
  },
}
