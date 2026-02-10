import type { Meta, StoryObj } from '@storybook/react'
import { UserIcon } from '@/components/ui/icons'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter your name...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter secret password...',
  },
}

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search the realm...',
    leftIcon: <UserIcon />,
  },
}

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Enter secret...',
    type: 'password',
    rightIcon: <UserIcon />,
  },
}
