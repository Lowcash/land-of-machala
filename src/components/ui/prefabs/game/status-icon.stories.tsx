import type { Meta, StoryObj } from '@storybook/react'
import { Heart, Shield, Sword, Zap } from 'lucide-react'

import { StatusIcon } from './status-icon'

const meta: Meta<typeof StatusIcon> = {
  title: 'UI/Prefabs/Display/StatusIcon',
  component: StatusIcon,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StatusIcon>

export const Success: Story = {
  args: {
    icon: Shield,
    variant: 'success',
  },
}

export const Danger: Story = {
  args: {
    icon: Heart,
    variant: 'danger',
  },
}

export const Warning: Story = {
  args: {
    icon: Sword,
    variant: 'warning',
  },
}

export const Info: Story = {
  args: {
    icon: Zap,
    variant: 'info',
  },
}
