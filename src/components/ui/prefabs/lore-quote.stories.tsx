import type { Meta, StoryObj } from '@storybook/react'

import { LoreQuote } from './lore-quote'

const meta: Meta<typeof LoreQuote> = {
  title: 'Prefabs/Display/LoreQuote',
  component: LoreQuote,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoreQuote>

export const Default: Story = {}
