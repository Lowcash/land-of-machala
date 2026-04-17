import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Box } from '@/components/ui/core/box'
import { HStack, VStack } from '@/components/ui/core/stack'

import { CharacterBox } from './character-box'

const meta: Meta<typeof CharacterBox> = {
  title: 'Features/Game/CharacterBox/Combat',
  component: CharacterBox,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box fullWidth minHeight="screen" bgColor="black">
        <Story />
      </Box>
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

export const StandardCombat: Story = {
  render: () => (
    <VStack
      fullHeight
      fullWidth
      align="center"
      justify="center"
      p="none"
      position="relative"
      overflow="hidden"
    >
      <HStack
        gap="xs"
        md={{ gap: 'md' }}
        align="center"
        justify="center"
        fullWidth
        maxWidth="5xl"
        p="md"
      >
        <Box flex="1" minWidth="zero">
          <CharacterBox
            name="Sir Rowen"
            level={12}
            hp={450}
            hpMax={500}
            resource={80}
            resourceMax={100}
            resourceType="energy"
            stats={mockHeroStats}
            xp={4500}
            xpMax={10000}
          />
        </Box>

        <VStack align="center" justify="center" px="xs" md={{ px: 'md' }} py="sm" shrink={true}>
          <span className="font-fantasy text-2xl md:text-4xl text-(--color-gold) italic drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            VS
          </span>
        </VStack>

        <Box flex="1" minWidth="zero">
          <CharacterBox
            name="Skeletal Warrior"
            level={8}
            hp={180}
            hpMax={200}
            resource={50}
            resourceMax={50}
            isEnemy
            stats={{ strength: 14, intelligence: 5, agility: 10, stamina: 18 }}
          />
        </Box>
      </HStack>
    </VStack>
  ),
}
