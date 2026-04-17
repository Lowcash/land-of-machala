import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import ErrorPage from './error'

const meta: Meta<typeof ErrorPage> = {
  title: 'App/Global Error',
  component: ErrorPage,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    error: new Error('Simulated application error') as Error & { digest?: string },
    reset: () => console.log('Reset triggered'),
  },
}

export const WithDigest: Story = {
  args: {
    error: Object.assign(new Error('A database connection could not be established.'), {
      digest: 'sys_err_550e8400-e29b-41d4-a716-446655440000',
    }),
    reset: () => console.log('Reset triggered'),
  },
}
