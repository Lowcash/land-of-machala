import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { RootEntryShell } from '@/components/features/auth/root-entry-shell'

const meta: Meta<typeof RootEntryShell> = {
  title: 'Features/Auth/EntryShell',
  component: RootEntryShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof RootEntryShell>

export const SignIn: Story = {
  args: {
    initialScreen: 'signIn',
  },
}

export const SignUp: Story = {
  args: {
    initialScreen: 'signUp',
  },
}
