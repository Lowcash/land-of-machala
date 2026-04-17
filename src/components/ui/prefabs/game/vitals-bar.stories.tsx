import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { VitalsBar } from './vitals-bar'

const meta: Meta<typeof VitalsBar> = {
  title: 'UI/Prefabs/Game/VitalsBar',
  component: VitalsBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof VitalsBar>

export const HP: Story = {
  args: {
    label: 'Health Points',
    variant: 'hp',
    value: 85,
    max: 120,
  },
}

export const MP: Story = {
  args: {
    label: 'Mana Pool',
    variant: 'mana',
    value: 45,
    max: 100,
  },
}

export const XP: Story = {
  args: {
    label: 'Experience',
    variant: 'xp',
    value: 1250,
    max: 2000,
  },
}

export const Compact: Story = {
  args: {
    label: 'Energy',
    variant: 'energy',
    value: 30,
    max: 100,
    compact: true,
  },
}
