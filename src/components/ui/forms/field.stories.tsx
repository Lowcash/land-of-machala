import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Checkbox } from './checkbox'
import { Field } from './field'
import { Input } from './input'

const meta: Meta<typeof Field> = {
  title: 'UI/Forms/Field',
  component: Field,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
  args: {
    label: 'Character Name',
    children: <Input placeholder="Enter your name..." />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    error: 'This email is already taken by a dark wizard.',
    children: <Input defaultValue="malphas@shadow.realm" />,
  },
}

export const Horizontal: Story = {
  args: {
    label: 'Remember Me',
    horizontal: true,
    children: <Checkbox />,
  },
}
