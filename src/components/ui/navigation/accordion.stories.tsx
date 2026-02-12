import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/components/ui/core/card'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

import { GameAccordion } from './accordion'

const meta: Meta<typeof GameAccordion> = {
  title: 'Navigation/Accordion',
  component: GameAccordion,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The value of the item to expand by default',
    },
    passthroughOnDesktop: {
      control: 'boolean',
      description: 'Convert to vertical stack on desktop (lg+)',
    },
  },
}

export default meta
type Story = StoryObj<typeof GameAccordion>

const defaultItems = [
  {
    value: 'item-1',
    title: 'První sekce',
    content: (
      <Card variant="subtle" padding="md">
        <MutedText>
          Obsah první sekce s několika řádky textu, aby byla vidět animace výšky.
          Používáme prefab MutedText uvnitř subtle karty pro věrnější ukázku.
        </MutedText>
      </Card>
    ),
  },
  {
    value: 'item-2',
    title: 'Druhá sekce',
    content: (
      <Card variant="subtle" padding="md">
        <MutedText>Obsah druhé sekce. Krátký text.</MutedText>
      </Card>
    ),
  },
  {
    value: 'item-3',
    title: 'Třetí sekce',
    content: (
      <Card variant="subtle" padding="md">
        <MutedText>Obsah třetí sekce.</MutedText>
      </Card>
    ),
  },
]

export const Default: Story = {
  args: {
    items: defaultItems,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md w-full">
        <Story />
      </div>
    ),
  ],
}

export const PassthroughDesktop: Story = {
  args: {
    items: defaultItems,
    passthroughOnDesktop: true,
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
}
