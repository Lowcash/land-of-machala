import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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
        I accept{' '}
        <button className="text-primary underline" onClick={() => undefined} type="button">
          Merchant Laws
        </button>{' '}
        and{' '}
        <button className="text-primary underline" onClick={() => undefined} type="button">
          Privacy Codex
        </button>{' '}
        of realm.
      </>
    ),
    toggleOnLabelClick: false,
  },
}
