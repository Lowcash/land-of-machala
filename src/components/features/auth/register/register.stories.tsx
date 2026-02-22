import type { Meta, StoryObj } from '@storybook/react'

import { MOCK_BENEFITS, MOCK_FOOTER, MOCK_LORE_QUOTE } from '@/lib/game/data/mocks'

import { AuthShell } from '@/components/ui/prefabs/layout/auth-shell'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

import { RegisterCard } from './card'
import { RegisterForm } from './form'
import { RegisterViewUI } from './view'

const meta: Meta<typeof RegisterViewUI> = {
  title: 'Features/Auth/Register',
  component: RegisterViewUI,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RegisterViewUI>

const MOCK_UI_LABELS = {
  email: 'Email Address',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  submit: 'Register Now',
  validation: {
    emailInvalid: 'Invalid email',
    passwordLength: 'Password too short (min 6)',
    passwordRequired: 'Required',
    passwordMismatch: 'Passwords do not match',
  },
}

export const FullPage: Story = {
  args: {
    hero: {
      title: 'Land of Machala',
      subtitle: 'Create your legend',
      description: 'Your story begins right here...',
    },
    footerLinks: {
      hasAccount: 'Already a traveler?',
      login: 'Sign in here',
    },
    accordion: {
      benefitsTitle: 'Why join the quest?',
    },
    benefits: {
      title: 'Begin Your Adventure',
      description: 'By registering, you gain access to the World of Machala:',
      items: MOCK_BENEFITS,
    },
    quote: MOCK_LORE_QUOTE,
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

export const CardOnly: StoryObj<typeof RegisterCard> = {
  name: 'RegisterCard',
  render: () => <RegisterCard uiLabels={MOCK_UI_LABELS} />,
}

export const FormOnly: StoryObj<typeof RegisterForm> = {
  name: 'RegisterForm',
  render: () => <RegisterForm uiLabels={MOCK_UI_LABELS} />,
}
