import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from './alert'
import { Stack } from './stack'

const meta: Meta<typeof Alert> = {
  title: 'Core/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ornamental', 'success', 'danger', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'none'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    title: 'Information',
    children: 'This is a standard informational alert for the adventurers.',
    variant: 'default',
  },
}

export const Ornamental: Story = {
  args: {
    title: 'Legendary Discovery',
    children: 'You have uncovered a hidden chamber filled with ancient relics.',
    variant: 'ornamental',
  },
}

export const Success: Story = {
  args: {
    title: 'Quest Completed',
    children: 'The forest has been cleared of spirits. Return to the village for your reward.',
    variant: 'success',
  },
}

export const Danger: Story = {
  args: {
    title: 'Critical Injury',
    children: 'Your health is low! Seek a healer or consume a potion immediately.',
    variant: 'danger',
  },
}

export const Warning: Story = {
  args: {
    title: 'Unstable Magic',
    children: 'The ley lines in this area are fluctuating wildly. Proceed with caution.',
    variant: 'warning',
  },
}

export const Info: Story = {
  args: {
    title: 'New Lore Unlocked',
    children: 'Read about the origins of the Machala Dynasty in your journal.',
    variant: 'info',
  },
}

export const Comparison: Story = {
  render: () => (
    <Stack gap="md" p="xl" maxWidth="md">
      <Alert title="Danger Alert" variant="danger">
        Red border and red side strip. Used for Health and critical errors.
      </Alert>
      <Alert title="Warning Alert" variant="warning">
        Amber border and amber side strip. Used for Strength and warnings.
      </Alert>
    </Stack>
  ),
}
