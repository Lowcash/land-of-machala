import type { Meta, StoryObj } from '@storybook/react'

import { LATEST_CHANGES } from '@/lib/game/constants/changelog'

import { Changelog } from './changelog'

const meta: Meta<typeof Changelog> = {
  title: 'Features/Auth/Changelog',
  component: Changelog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Changelog>

export const Default: Story = {
  args: {
    changes: LATEST_CHANGES,
  },
}

export const Minimal: Story = {
  args: {
    changes: LATEST_CHANGES,
    forceMinimal: true,
  },
}
