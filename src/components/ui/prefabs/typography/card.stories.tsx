import type { Meta, StoryObj } from '@storybook/react'
import { Shield } from 'lucide-react'

import { CardTitle } from './card'

const meta: Meta<typeof CardTitle> = {
  title: 'UI/Prefabs/Typography/Card',
  component: CardTitle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CardTitle>

export const Default: Story = {
  args: {
    children: 'The Knight\'s Shield',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Defender\'s Vow',
    icon: Shield,
  },
}

export const Large: Story = {
  args: {
    children: 'Legendary Artifact',
    variant: 'large',
  },
}

export const FantasyValue: Story = {
  args: {
    children: '1250 GOLD',
    variant: 'fantasy-value',
  },
}
