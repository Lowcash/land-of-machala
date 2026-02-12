import type { Meta, StoryObj } from '@storybook/react'

import { SERVER_STATS } from '@/lib/game/constants/stats'

import { Stats } from './stats'

const meta: Meta<typeof Stats> = {
  title: 'Features/Auth/Stats',
  component: Stats,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stats>

export const Default: Story = {
  args: {
    stats: SERVER_STATS,
  },
}

export const Minimal: Story = {
  args: {
    stats: SERVER_STATS,
    forceMinimal: true,
  },
}
