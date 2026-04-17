import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Loader } from './loader'

const meta: Meta<typeof Loader> = {
  title: 'UI/Core/Loader',
  component: Loader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {
    size: 16,
  },
}

export const Large: Story = {
  args: {
    size: 32,
  },
}
