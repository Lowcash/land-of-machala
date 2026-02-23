import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from './badge'
import { HStack, VStack } from './stack'

const meta: Meta<typeof Badge> = {
  title: 'UI/Core/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Variants: Story = {
  render: () => (
    <VStack gap="md">
      <HStack gap="sm" align="center">
        <Badge variant="primary">1</Badge>
        <Badge variant="primary" size="md">
          42
        </Badge>
        <Badge variant="primary" size="lg">
          99
        </Badge>
      </HStack>
      <HStack gap="sm" align="center">
        <Badge variant="success">LVL</Badge>
        <Badge variant="danger">☠</Badge>
      </HStack>
    </VStack>
  ),
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '42',
    size: 'md',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '☠',
    size: 'md',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: '✔',
    size: 'sm',
  },
}
