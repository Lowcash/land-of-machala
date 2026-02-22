import type { Meta, StoryObj } from '@storybook/react'

import { BrandedHero } from './branded-hero'

const meta: Meta<typeof BrandedHero> = {
  title: 'Prefabs/Display/BrandedHero',
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
    subtitle: 'Create your account',
    description: 'Your legend awaits to be written...',
  },
}
