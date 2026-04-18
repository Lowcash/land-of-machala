import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  MOCK_CHANGELOG,
  MOCK_FOOTER,
  MOCK_LORE_QUOTE,
  MOCK_SERVER_STATS,
} from '@/lib/game/data/mocks'

import { AuthShell } from '@/components/ui/prefabs/layout/auth-shell'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

import { LoginCard } from './card'
import { LoginForm } from './form'
import { LoginViewUI } from './ui'

const meta: Meta<typeof LoginViewUI> = {
  title: 'Features/Auth/Login',
  component: LoginViewUI,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginViewUI>

const MOCK_UI_LABELS = {
  email: 'Email',
  emailPlaceholder: 'traveler@machala.cz',
  password: 'Password',
  submit: 'Login Now',
  rememberMe: 'Remember Me',
  validation: {
    emailInvalid: 'Invalid email',
    passwordRequired: 'Password is required',
  },
}

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
    uiLabels: MOCK_UI_LABELS,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <RootShell>
        <AuthShell>
          <Story />
        </AuthShell>
      </RootShell>
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
      uiLabels={MOCK_UI_LABELS}
    />
  ),
}

export const FormOnly: StoryObj<typeof LoginForm> = {
  name: 'LoginForm',
  render: () => <LoginForm uiLabels={MOCK_UI_LABELS} />,
}
