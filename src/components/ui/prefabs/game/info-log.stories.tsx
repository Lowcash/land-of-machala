import type { Meta, StoryObj } from '@storybook/react'

import { InfoLog, type LogEntry } from './info-log'

const meta: Meta<typeof InfoLog> = {
  title: 'Prefabs/Game/InfoLog',
  component: InfoLog,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof InfoLog>

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(),
    message: 'You found 15 gold coins in the chest.',
    type: 'loot',
  },
  {
    id: '2',
    timestamp: new Date(),
    message: 'Your spell hit the Skeleton for 24 damage.',
    type: 'playerAttack',
  },
  {
    id: '3',
    timestamp: new Date(),
    message: 'The Skeleton struck you for 12 damage.',
    type: 'enemyAttack',
  },
  {
    id: '4',
    timestamp: new Date(),
    message: 'You drank a healing potion (+50 HP).',
    type: 'heal',
  },
  {
    id: '5',
    timestamp: new Date(),
    message: 'You discovered a hidden path leading into the Dark Forest.',
    type: 'discovery',
  },
  {
    id: '6',
    timestamp: new Date(),
    message: 'Your mana regenerates (+5 MP).',
    type: 'mana',
  },
  {
    id: '7',
    timestamp: new Date(),
    message: 'You perished in battle. The darkness claims you.',
    type: 'death',
  },
]

export const Default: Story = {
  args: {
    logs: mockLogs,
    maxHeight: 300,
  },
}

export const Empty: Story = {
  args: {
    logs: [],
    maxHeight: 200,
  },
}

export const Ticker: Story = {
  args: {
    logs: mockLogs,
    variant: 'ticker',
  },
}

export const LongHistory: Story = {
  args: {
    logs: [...mockLogs, ...mockLogs.map((l) => ({ ...l, id: l.id + '_2' }))],
    maxHeight: 300,
  },
}
