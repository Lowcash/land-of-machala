/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react'
import { Flame, Shield, Swords, Zap } from 'lucide-react'

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

const MOCK_IMAGE = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'

export const Melee: Story = {
  args: {
    name: 'Sir Rowen',
    level: 12,
    image: MOCK_IMAGE,
    hp: { current: 450, max: 500 },
    energy: { current: 15, max: 20 },
    gold: 1250,
    location: 'Železný vrch',
    stats: [
      { label: 'STR', value: 18, icon: Swords, color: 'strength' },
      { label: 'DEF', value: 14, icon: Shield, color: 'secondary' },
      { label: 'SPD', value: 10, icon: Zap, color: 'agility' },
      { label: 'LUK', value: 5, icon: Flame, color: 'primary' },
    ],
  },
}

export const Mage: Story = {
  args: {
    name: 'Archmage Thalos',
    level: 25,
    image: MOCK_IMAGE,
    hp: { current: 220, max: 300 },
    mana: { current: 550, max: 600 },
    gold: 8400,
    location: 'Věž ticha',
    stats: [
      { label: 'INT', value: 42, icon: Flame, color: 'intelligence' },
      { label: 'WIL', value: 38, icon: Zap, color: 'mana' },
      { label: 'RES', value: 15, icon: Shield, color: 'secondary' },
      { label: 'LUK', value: 12, icon: Swords, color: 'primary' },
    ],
  },
}

export const LongName: Story = {
  args: {
    name: 'Xandertheus O`Malley the Third of the Eastern Kingdoms',
    level: 99,
    image: MOCK_IMAGE,
    hp: { current: 9999, max: 9999 },
    mana: { current: 1200, max: 1200 },
    gold: 999999,
    location: 'Sídlo prastarých králů pod horou',
    stats: [
      { label: 'HP', value: 9999, icon: Swords, color: 'hp' },
      { label: 'MP', value: 1200, icon: Flame, color: 'mana' },
      { label: 'ATK', value: 999, icon: Swords, color: 'primary' },
      { label: 'DEF', value: 999, icon: Shield, color: 'secondary' },
    ],
  },
}

export const Combat: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <VStack fullHeight fullWidth align="center" justify="center" p="md" bgColor="black">
      <Stack
        direction="row"
        gap="xs"
        sm={{ gap: 'xl' }}
        align="center"
        justify="center"
        fullWidth
        maxWidth="5xl"
      >
        <VStack gap="none" flex="1" minWidth="zero">
          <CharacterBox
            name="Sir Rowen"
            level={12}
            image={MOCK_IMAGE}
            hp={{ current: 450, max: 500 }}
            energy={{ current: 15, max: 20 }}
          />
        </VStack>
        <Value font="fantasy" variant="large" color="gold" shrink>
          VS
        </Value>
        <VStack gap="none" flex="1" minWidth="zero">
          <CharacterBox
            name="Kostlivec"
            level={8}
            image={MOCK_IMAGE}
            hp={{ current: 120, max: 120 }}
            mana={{ current: 50, max: 50 }}
            isEnemy
          />
        </VStack>
      </Stack>
    </VStack>
  ),
}
