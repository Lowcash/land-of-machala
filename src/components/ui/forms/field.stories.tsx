import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Stack } from '@/components/ui/core/layout'
import { LabelText } from '@/components/ui/core/typography'
import { Field, TextInputControl } from '@/components/ui/forms/field'
import { FieldChrome } from '@/components/ui/forms/field-chrome'

const meta: Meta<typeof Field> = {
  title: 'UI/Forms/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
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

export const HelperTextBehavior: Story = {
  render: () => (
    <Stack>
      <Field
        hint="Must be at least 3 characters."
        label="Hero name"
        onChange={() => undefined}
        placeholder="Enter hero name"
      />
      <Field
        error="This name is already taken in realm."
        label="Hero name"
        onChange={() => undefined}
        placeholder="Enter hero name"
      />
      <FieldChrome.Root>
        <FieldChrome.Label htmlFor="storybook-helper">Hero name</FieldChrome.Label>
        <TextInputControl
          id="storybook-helper"
          onChange={() => undefined}
          placeholder="Enter hero name"
        />
        <LabelText tone="muted">Reserved helper slot</LabelText>
        <FieldChrome.HelperText tone="invisible">Reserved helper slot</FieldChrome.HelperText>
        <LabelText tone="muted">No reserved helper slot</LabelText>
        <FieldChrome.HelperText reserveSpace={false} />
      </FieldChrome.Root>
    </Stack>
  ),
}
