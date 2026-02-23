import type { Meta, StoryObj } from '@storybook/react'

import { Description, Label, Value } from '../prefabs/typography/shared'
import { Button } from './button'
import { Stack } from './stack'
import { Tooltip } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Core/Tooltip',
  component: Tooltip,
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
    content: (
      <Value variant="small" color="gold">
        A more ornate tooltip with golden borders and glass effect.
      </Value>
    ),
    variant: 'ornamental',
  },
}

export const Directions: Story = {
  render: () => (
    <Stack display="grid" cols="2" sm={{ cols: '4' }} gap="md" align="center" justify="center">
      <Tooltip content={<Value variant="tiny">Tooltip on Top</Value>} side="top">
        <Button variant="secondary" fullWidth={false}>
          Top
        </Button>
      </Tooltip>
      <Tooltip content={<Value variant="tiny">Tooltip on Bottom</Value>} side="bottom">
        <Button variant="secondary" fullWidth={false}>
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content={<Value variant="tiny">Tooltip on Left</Value>} side="left">
        <Button variant="secondary" fullWidth={false}>
          Left
        </Button>
      </Tooltip>
      <Tooltip content={<Value variant="tiny">Tooltip on Right</Value>} side="right">
        <Button variant="secondary" fullWidth={false}>
          Right
        </Button>
      </Tooltip>
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
        <Label variant="tiny" bold color="gold">
          Legendary Item
        </Label>
        <Description variant="bonus">A blade forged in the fires of Mount Machala.</Description>
      </Stack>
    ),
    variant: 'ornamental',
  },
}
