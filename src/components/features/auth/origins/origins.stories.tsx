import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { OriginsView } from '@/components/features/auth/origins/view'

const meta: Meta<typeof OriginsView> = {
  title: 'Features/Auth/Origins',
  component: OriginsView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof OriginsView>

export const Prologue: Story = {
  args: {
    initialPhase: 'prologue',
  },
}

export const CharacterSetup: Story = {
  args: {
    initialPhase: 'creation',
  },
}
