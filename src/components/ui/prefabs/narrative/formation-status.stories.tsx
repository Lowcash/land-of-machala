import type { Meta, StoryObj } from '@storybook/react'
import { Sparkles, Sword, Book } from 'lucide-react'

import { FormationStatus } from './formation-status'

const meta: Meta<typeof FormationStatus> = {
  title: 'UI/Prefabs/Narrative/FormationStatus',
  component: FormationStatus,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormationStatus>

export const Combat: Story = {
  args: {
    icon: Sword,
    children: 'Ready for Battle',
  },
}

export const Magic: Story = {
  args: {
    icon: Sparkles,
    children: 'Arcane Potential',
  },
}

export const Lore: Story = {
  args: {
    icon: Book,
    children: 'Prophecy Discovered',
  },
}
