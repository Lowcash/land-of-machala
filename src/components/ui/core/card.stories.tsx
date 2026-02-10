import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { Button } from './button'
import { Text } from './typography'

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card variant={args.variant} padding={args.padding}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
      </Card.Header>
      <Card.Content>
        <Text>This is a default minimalist medieval card. It uses the strict component API.</Text>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary">Action</Button>
      </Card.Footer>
    </Card>
  ),
}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => (
    <Card variant={args.variant} padding={args.padding}>
      <Card.Header>
        <Card.Title icon={<span>⚔️</span>}>Quest Log</Card.Title>
      </Card.Header>
      <Card.Content>
        <Text>This is a premium primary card with a gold border.</Text>
        <Text variant="muted">Current Objective: Survive.</Text>
      </Card.Content>
    </Card>
  ),
}

export const SimpleContent: Story = {
  render: (args) => (
    <Card variant={args.variant} padding={args.padding}>
      <Card.Content>
        <Text>Just some simple content without header or footer.</Text>
      </Card.Content>
    </Card>
  ),
}
