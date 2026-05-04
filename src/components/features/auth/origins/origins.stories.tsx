import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { OriginsViewClient } from '@/components/features/auth/origins/view-client'

const meta: Meta<typeof OriginsViewClient> = {
  title: 'Features/Auth/Origins',
  component: OriginsViewClient,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof OriginsViewClient>

export const Prologue: Story = {
  args: {
    initialPhase: 'prologue',
  },
}

export const Setup: Story = {
  args: {
    initialPhase: 'setup',
  },
}
