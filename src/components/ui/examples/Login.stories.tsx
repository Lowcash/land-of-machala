import type { Meta, StoryObj } from '@storybook/react'

import { LATEST_CHANGES } from '@/lib/game/constants/changelog'
import { SERVER_STATS } from '@/lib/game/constants/stats'

import { Changelog } from '@/components/features/auth/changelog'
import { LoginCard } from '@/components/features/auth/login.card'
import { Stats } from '@/components/features/auth/stats'
import { VStack } from '@/components/ui/core/stack'
import { BrandedHero } from '@/components/ui/prefabs/branded-hero'

const meta: Meta = {
  title: 'Examples/Login Page',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const CardOnly: Story = {
  render: () => <LoginCard />,
}

export const FullPage: Story = {
  render: () => (
    <VStack gap="xl" align="center">
      <BrandedHero subtitle="Vytvoř si nový účet" description="Tvá legenda čeká na sepsání..." />
      <LoginCard />
      <Stats stats={SERVER_STATS} />
      <Changelog changes={LATEST_CHANGES} />
    </VStack>
  ),
}
