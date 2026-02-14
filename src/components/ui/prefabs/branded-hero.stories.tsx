import type { Meta, StoryObj } from '@storybook/react'

import { BrandedHero } from './branded-hero'

const meta: Meta<typeof BrandedHero> = {
  title: 'Prefabs/BrandedHero',
  component: BrandedHero,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof BrandedHero>

export const Default: Story = {
  args: {
    title: 'Land of Machala',
    subtitle: 'Vytvoř si nový účet',
    description: 'Tvá legenda čeká na sepsání...',
  },
}
