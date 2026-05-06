import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Field } from '@/components/ui/forms/field'

const meta: Meta<typeof Field> = {
  title: 'UI/Forms/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Hero Name',
    placeholder: 'Enter your hero name...',
    onChange: () => undefined,
  },
}

export default meta

type Story = StoryObj<typeof Field>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    hint: 'Must be 3–20 characters.',
  },
}

export const WithError: Story = {
  args: {
    error: 'This name is already taken in the realm.',
  },
}

export const WithAction: Story = {
  args: {
    actionLabel: 'Forgotten scrolls?',
    label: 'Spirit Password',
    type: 'password',
  },
}

export const Filled: Story = {
  args: {
    value: 'Aldric the Brave',
  },
}
