import type { Meta, StoryObj } from '@storybook/react'

import { MOCK_CHANGELOG } from '@/lib/game/data/mocks'

import { Changelog } from './changelog'

const meta: Meta<typeof Changelog> = {
  title: 'UI/Prefabs/Narrative/Changelog',
  component: Changelog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Changelog>

export const Default: Story = {
  args: {
    title: 'Kingdom News',
    changes: MOCK_CHANGELOG,
  },
}

export const Minimal: Story = {
  args: {
    title: 'Changes',
    changes: MOCK_CHANGELOG,
    forceMinimal: true,
  },
}
