import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { StoryContainer } from '@/components/ui/storybook-utils'

import { CharacterBox } from './character-box'

const meta: Meta<typeof CharacterBox> = {
  title: 'Features/Game/CharacterBox',
  component: CharacterBox,
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
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
    xp: 4500,
    xpMax: 10000,
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
    xp: 85000,
    xpMax: 100000,
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
    stats: {
      strength: 14,
      intelligence: 5,
      agility: 12,
      stamina: 18,
    },
  },
}

export const MinimalMobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    ...Melee.args,
    compact: true,
  },
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
