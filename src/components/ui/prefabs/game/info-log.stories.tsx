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
    message: 'Získal jsi 15 zlatých z truhly.',
    type: 'loot',
  },
  {
    id: '2',
    timestamp: new Date(),
    message: 'Tvé kouzlo zasáhlo Kostlivce za 24 poškození.',
    type: 'playerAttack',
  },
  {
    id: '3',
    timestamp: new Date(),
    message: 'Kostlivec tě zasáhl za 12 poškození.',
    type: 'enemyAttack',
  },
  {
    id: '4',
    timestamp: new Date(),
    message: 'Vypil jsi lektvar léčení (+50 HP).',
    type: 'heal',
  },
  {
    id: '5',
    timestamp: new Date(),
    message: 'Objevil jsi skrytou stezku do Černého lesa.',
    type: 'discovery',
  },
  {
    id: '6',
    timestamp: new Date(),
    message: 'Tvá mana se obnovuje (+5 MP).',
    type: 'mana',
  },
]

export const Default: Story = {
  args: {
    logs: mockLogs,
    maxHeight: 250,
  },
}

export const Empty: Story = {
  args: {
    logs: [],
    maxHeight: 200,
  },
}

export const LongHistory: Story = {
  args: {
    logs: [...mockLogs, ...mockLogs.map((l) => ({ ...l, id: l.id + '_1' }))],
    maxHeight: 300,
  },
}
