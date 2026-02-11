import type { Meta, StoryObj } from '@storybook/react'

import { SERVER_STATS } from '@/lib/game/constants/stats'
import { LoginCard } from './login.card'
import { LoginForm } from './login.form'
import { LoginView } from './login.view'
import { Stats } from './stats'

const meta: Meta<typeof LoginView> = {
  title: 'Features/Auth/Login',
  component: LoginView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginView>

export const FullPage: Story = {
  parameters: {
    layout: 'fullscreen',
  },
}

export const FormOnly: StoryObj<typeof LoginForm> = {
  render: () => <LoginForm />,
}

export const CardOnly: StoryObj<typeof LoginCard> = {
  render: () => <LoginCard />,
}

export const StatsOnly: StoryObj<typeof Stats> = {
  render: () => <Stats stats={SERVER_STATS} />,
}
