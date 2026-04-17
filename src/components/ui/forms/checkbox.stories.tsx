import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Remember my journey',
  },
}

export const Checked: Story = {
  args: {
    label: 'Accepted terms',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Cannot change this',
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {},
}
