/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/components/ui/core/card'
import { HStack, Stack, VStack } from '@/components/ui/core/stack'
import { Value } from '@/components/ui/prefabs/typography/shared'

import { CharacterBox } from './character-box'

const meta: Meta<typeof CharacterBox> = {
  title: 'Features/Game/CharacterBox',
  component: CharacterBox,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof CharacterBox>

const mockHeroStats = {
  strength: 18,
  intelligence: 12,
  agility: 14,
  stamina: 16,
}

export const Melee: Story = {
  args: {
    name: 'Sir Rowen',
    level: 12,
    hp: 450,
    hpMax: 500,
    resource: 80,
    resourceMax: 100,
    resourceType: 'energy',
    gold: 1250,
    location: 'Iron Peak',
    stats: mockHeroStats,
  },
}

export const Mage: Story = {
  args: {
    name: 'Archmage Thalos',
    level: 25,
    hp: 220,
    hpMax: 300,
    resource: 550,
    resourceMax: 600,
    resourceType: 'mana',
    gold: 8400,
    location: 'Tower of Silence',
    stats: {
      strength: 8,
      intelligence: 42,
      agility: 12,
      stamina: 14,
    },
  },
}

export const Enemy: Story = {
  args: {
    name: 'Enraged Skeleton',
    level: 8,
    hp: 120,
    hpMax: 120,
    resource: 50,
    resourceMax: 50,
    isEnemy: true,
  },
}

export const Combat: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <VStack fullHeight fullWidth align="center" justify="center" p="md" bgColor="black">
      <HStack gap="xl" align="center" justify="center" fullWidth maxWidth="5xl">
        <CharacterBox
          name="Sir Rowen"
          level={12}
          hp={450}
          hpMax={500}
          resource={80}
          resourceMax={100}
          resourceType="energy"
          compact
          stats={mockHeroStats}
        />
        <Value font="fantasy" variant="large" color="gold" shrink>VS</Value>
        <CharacterBox
          name="Skeleton"
          level={8}
          hp={120}
          hpMax={120}
          resource={50}
          resourceMax={50}
          isEnemy
          compact
          stats={{ strength: 10, intelligence: 5, agility: 8, stamina: 12 }}
        />
      </HStack>
    </VStack>
  ),
}

export const LongName: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    ...Melee.args,
    name: 'Sir Rowen of the Distant Lands and the Scorching Sun',
    xp: 99999,
    xpMax: 100000,
  },
}
