import type { Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'

import '../src/app/globals.css'
import { getMessages, routing } from '../src/lib/i18n'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
    },
    a11y: {
      test: 'todo',
    },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: [
          'Features',
          ['Auth', ['EntryShell', 'Origins']],
          'UI',
              [
                'Foundation',
                'Core',
                'Forms',
                'Typography',
                ['BrandWordmark', 'BodyText', 'LabelText', 'DisplayValue', 'Prefabs'],
              ],
        ],
      },
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
        onClick={(event) => {
          const target = event.target as HTMLElement
          const link = target.closest('a')

          if (link && link.getAttribute('href') && !link.getAttribute('href')?.startsWith('#')) {
            event.preventDefault()
          }
        }}
      >
        <NextIntlClientProvider locale={routing.defaultLocale} messages={getMessages()}>
          <Story />
        </NextIntlClientProvider>
      </div>
    ),
  ],
}

export default preview
