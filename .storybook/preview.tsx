import type { Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'

import messages from '../messages/en.json'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Features', ['Auth', ['Login', 'Register', 'Origins']], 'UI', ['Core', 'Forms', 'Navigation', 'Prefabs', 'Shared'], 'System'],
      },
    },
    layout: 'centered',

    a11y: {
      test: 'todo',
    },
    nextjs: {
      appDirectory: true,
    },
    router: {
      push: {
        action: 'router.push',
      },
      replace: {
        action: 'router.replace',
      },
    },
  },

  decorators: [
    (Story) => (
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement
          const link = target.closest('a')
          if (link && link.getAttribute('href') && !link.getAttribute('href')?.startsWith('#')) {
            e.preventDefault()
          }
        }}
      >
        <NextIntlClientProvider locale="en" messages={messages}>
          <Story />
        </NextIntlClientProvider>
      </div>
    ),
  ],
}

export default preview
