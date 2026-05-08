import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DisplayValue } from '@/components/ui/core/typography'

const meta: Meta<typeof DisplayValue> = {
  title: 'UI/Typography/DisplayValue',
  component: DisplayValue,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof DisplayValue>

export const Large: Story = {
  name: 'DisplayValue / Large',
  args: { children: '1,248' },
}

export const HeroPrimary: Story = {
  name: 'DisplayValue / Hero primary',
  args: { align: 'center', children: '42', size: 'hero', tone: 'primary' },
}
