import type { Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'

import '../src/app/globals.css'
import { getMessages, routing } from '../src/lib/i18n'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    controls: {
      expanded: true,
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale={routing.defaultLocale} messages={getMessages()}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
}

export default preview
