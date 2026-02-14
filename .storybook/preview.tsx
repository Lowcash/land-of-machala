import type { Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'

import messages from '../messages/en.json'
import '../src/app/globals.css'
import { Background } from '../src/components/ui/shared/background'

const preview: Preview = {
  parameters: {
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
          <div className="font-body antialiased selection:bg-(--color-secondary)/30 selection:text-(--color-ivory)">
            <Background />
            <Story />
          </div>
        </NextIntlClientProvider>
      </div>
    ),
  ],
}

export default preview
