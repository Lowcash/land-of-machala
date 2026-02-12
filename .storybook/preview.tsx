import type { Preview } from '@storybook/nextjs-vite'

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
      <div className="font-body antialiased">
        <Story />
      </div>
    ),
  ],
}

export default preview
