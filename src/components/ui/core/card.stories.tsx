import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'This is a default minimalist medieval card.',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'This is a premium primary card with a gold border.',
  },
}

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: 'Card with large padding for more breathing room.',
  },
}
