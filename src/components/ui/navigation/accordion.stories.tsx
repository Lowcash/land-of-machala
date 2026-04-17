import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Card } from '@/components/ui/core/card'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

import { GameAccordion } from './accordion'

const meta: Meta<typeof GameAccordion> = {
  title: 'UI/Navigation/Accordion',
  component: GameAccordion,
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
    title: 'Character Origins',
    content: (
      <Card variant="subtle" padding="md">
        <MutedText>
          Your bloodline shapes your starting attributes. Choose wisely — each race carries ancient
          strengths forged over centuries of war and hardship.
        </MutedText>
      </Card>
    ),
  },
  {
    value: 'item-2',
    title: 'Class Selection',
    content: (
      <Card variant="subtle" padding="md">
        <MutedText>Select a class to define your combat style and skill progression.</MutedText>
      </Card>
    ),
  },
  {
    value: 'item-3',
    title: 'Stat Bonuses',
    content: (
      <Card variant="subtle" padding="md">
        <MutedText>Each choice grants unique stat modifiers to your hero.</MutedText>
      </Card>
    ),
  },
]

export const Default: Story = {
  args: {
    items: defaultItems,
  },
}

export const PassthroughDesktop: Story = {
  args: {
    items: defaultItems,
    passthroughOnDesktop: true,
    defaultValue: 'item-1',
  },
}
