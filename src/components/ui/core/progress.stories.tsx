import type { Meta, StoryObj } from '@storybook/react'

import { Progress } from './progress'
import { Value } from '../prefabs/typography/shared'
import { VStack } from './stack'

const meta: Meta<typeof Progress> = {
  title: 'UI/Core/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['hp', 'mana', 'xp', 'energy', 'gold'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    (Story) => (
      <VStack align="center" justify="center" p="xl" fullWidth minHeight="character" bgColor="black">
        <VStack maxWidth="md" fullWidth gap="md" align="stretch" style={{ width: '100%', minWidth: '320px' }}>
          <Story />
        </VStack>
      </VStack>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Progress>

export const Health: Story = {
  args: {
    variant: 'hp',
    value: 75,
    max: 100,
  },
}

export const Mana: Story = {
  args: {
    variant: 'mana',
    value: 40,
    max: 100,
  },
}

export const Experience: Story = {
  args: {
    variant: 'xp',
    value: 90,
    max: 100,
  },
}

export const Gold: Story = {
  args: {
    variant: 'gold',
    value: 60,
    max: 100,
  },
}

export const Energy: Story = {
  args: {
    variant: 'energy',
    value: 25,
    max: 100,
  },
}

export const WithText: Story = {
  args: {
    variant: 'xp',
    value: 1250,
    max: 2000,
    size: 'lg',
    children: (
      <Value variant="tiny" color="primary" tabularNums>
        1250 / 2000 XP
      </Value>
    ),
  },
}
