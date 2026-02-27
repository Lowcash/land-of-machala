import type { Meta, StoryObj } from '@storybook/react'

import { LoreQuote } from './lore-quote'

const meta: Meta<typeof LoreQuote> = {
  title: 'UI/Prefabs/Display/LoreQuote',
  component: LoreQuote,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoreQuote>

export const Default: Story = {
  args: {
    quote:
      'The stars whisper of things that were, and things that are yet to be. Listen closely, traveler.',
  },
}
