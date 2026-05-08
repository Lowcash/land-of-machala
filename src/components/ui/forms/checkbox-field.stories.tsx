import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InlineTextButton } from '@/components/ui/core/inline-text-button'
import { CheckboxField } from '@/components/ui/forms/checkbox-field'

const meta: Meta<typeof CheckboxField> = {
  title: 'UI/Forms/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 'storybook-checkbox',
    label: 'Remember my spirit',
    onChange: () => undefined,
  },
}

export default meta

type Story = StoryObj<typeof CheckboxField>

export const Unchecked: Story = {
  args: {
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const ErrorState: Story = {
  args: {
    checked: false,
    error: 'Merchant Laws and Privacy Codex must be accepted.',
    label: 'I accept Merchant Laws and Privacy Codex of realm.',
  },
}

export const InteractiveLegalLinks: Story = {
  args: {
    checked: false,
    label: (
      <>
        I accept <InlineTextButton onClick={() => undefined}>Merchant Laws</InlineTextButton> and{' '}
        <InlineTextButton onClick={() => undefined}>Privacy Codex</InlineTextButton> of realm.
      </>
    ),
  },
}
