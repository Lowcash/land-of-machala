import type { Meta, StoryObj } from '@storybook/react'

import { MOCK_SERVER_STATS } from '@/lib/game/data/mocks'

import { Stats } from './stats'

const meta: Meta<typeof Stats> = {
  title: 'UI/Prefabs/Narrative/Stats',
  component: Stats,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stats>

export const Default: Story = {
  args: {
    title: 'World Status',
    stats: MOCK_SERVER_STATS,
  },
}

export const Minimal: Story = {
  args: {
    title: 'Status',
    stats: MOCK_SERVER_STATS,
    forceMinimal: true,
  },
}
