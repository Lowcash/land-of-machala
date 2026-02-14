import type { Meta, StoryObj } from '@storybook/react'

import { MOCK_BENEFITS, MOCK_FOOTER, MOCK_LORE_QUOTE } from '@/lib/game/data/mocks'

import { AuthPageLayout } from '@/components/features/auth/shared/auth-page-layout'

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

export const CardOnly: StoryObj<typeof RegisterCard> = {
  name: 'RegisterCard',
  render: () => <RegisterCard />,
}

export const FormOnly: StoryObj<typeof RegisterForm> = {
  name: 'RegisterForm',
  render: () => <RegisterForm />,
}
