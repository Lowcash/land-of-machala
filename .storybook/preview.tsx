import type { Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'

import messages from '../messages/cs.json'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',

    a11y: {
      test: 'todo',
    },
    nextjs: {
      appDirectory: true,
    },
  },

  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="cs" messages={messages}>
        <div className="font-body antialiased">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
}

export default preview
