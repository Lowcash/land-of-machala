import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './tooltip'
import { Button } from './button'
import { HStack, Stack } from './stack'
import { Value, Label, Description } from '../prefabs/typography/shared'

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    children: <Button variant="choice">Hover me</Button>,
    content: <Value variant="small">This is a standard tooltip message.</Value>,
    variant: 'default',
  },
}

export const Ornamental: Story = {
  args: {
    children: <Button variant="primary">Medieval Hover</Button>,
    content: <Value variant="small" color="gold">A more ornate tooltip with golden borders and glass effect.</Value>,
    variant: 'ornamental',
  },
}

export const Directions: Story = {
  render: () => (
    <Stack gap="xl" p="xl">
      <HStack gap="lg">
        <Tooltip content={<Value variant="tiny">Tooltip on Top</Value>} side="top">
          <Button variant="secondary" fullWidth={false}>Top</Button>
        </Tooltip>
        <Tooltip content={<Value variant="tiny">Tooltip on Bottom</Value>} side="bottom">
          <Button variant="secondary" fullWidth={false}>Bottom</Button>
        </Tooltip>
        <Tooltip content={<Value variant="tiny">Tooltip on Left</Value>} side="left">
          <Button variant="secondary" fullWidth={false}>Left</Button>
        </Tooltip>
        <Tooltip content={<Value variant="tiny">Tooltip on Right</Value>} side="right">
          <Button variant="secondary" fullWidth={false}>Right</Button>
        </Tooltip>
      </HStack>
    </Stack>
  ),
}

export const RichContent: Story = {
  args: {
    children: (
      <Value bold truncate color="primary">
        Complex Info
      </Value>
    ),
    content: (
      <Stack gap="xxs">
        <Label variant="tiny" bold color="gold">Legendary Item</Label>
        <Description variant="bonus">
          A blade forged in the fires of Mount Machala.
        </Description>
      </Stack>
    ),
    variant: 'ornamental',
  },
}
