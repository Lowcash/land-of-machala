import type { Meta, StoryObj } from '@storybook/react'
import { Crown, Flame, Ghost } from 'lucide-react'

import { FeatureIcon } from './feature-icon'

const meta: Meta<typeof FeatureIcon> = {
  title: 'UI/Prefabs/Display/FeatureIcon',
  component: FeatureIcon,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FeatureIcon>

export const Gold: Story = {
  args: {
    icon: Crown,
    color: 'gold',
  },
}

export const Secondary: Story = {
  args: {
    icon: Flame,
    color: 'secondary',
  },
}

export const Ivory: Story = {
  args: {
    icon: Ghost,
    color: 'ivory',
  },
}
