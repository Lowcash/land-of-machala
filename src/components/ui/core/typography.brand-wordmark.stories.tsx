import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BrandWordmark } from '@/components/ui/core/typography'

const meta: Meta<typeof BrandWordmark> = {
  title: 'UI/Typography/BrandWordmark',
  component: BrandWordmark,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof BrandWordmark>

export const Default: Story = {
  name: 'BrandWordmark',
  args: { children: 'Land of Machala' },
}
