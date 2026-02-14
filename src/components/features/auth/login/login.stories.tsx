import type { Meta, StoryObj } from '@storybook/react'

import {
  MOCK_CHANGELOG,
  MOCK_FOOTER,
  MOCK_LORE_QUOTE,
  MOCK_SERVER_STATS,
} from '@/lib/game/data/mocks'

import { AuthPageLayout } from '@/components/features/auth/shared/auth-page-layout'

import { LoginCard } from './card'
import { LoginForm } from './form'
import { LoginViewUI } from './view'

const meta: Meta<typeof LoginViewUI> = {
  title: 'Features/Auth/Login',
  component: LoginViewUI,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginViewUI>

export const FullPage: Story = {
  args: {
    hero: {
      title: 'Land of Machala',
      subtitle: 'Welcome back, traveler',
      description: 'Your adventure continues where you left off...',
    },
    card: {
      guestLabel: 'Try as a guest (without registration)',
      registerLabel: 'Establish your legacy',
      orLabel: 'Or',
    },
    accordion: {
      statsTitle: 'World Status',
      changelogTitle: 'Kingdom News',
    },
    quote: MOCK_LORE_QUOTE,
    stats: MOCK_SERVER_STATS,
    changes: MOCK_CHANGELOG,
    footer: MOCK_FOOTER,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AuthPageLayout>
        <Story />
      </AuthPageLayout>
    ),
  ],
}

export const CardOnly: StoryObj<typeof LoginCard> = {
  name: 'LoginCard',
  render: () => (
    <LoginCard
      guestLabel="Try as a guest (without registration)"
      registerLabel="Establish your legacy"
      orLabel="Or"
    />
  ),
}

export const FormOnly: StoryObj<typeof LoginForm> = {
  name: 'LoginForm',
  render: () => <LoginForm />,
}
