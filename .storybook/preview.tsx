import type { Preview } from '@storybook/nextjs-vite'

import '../app/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
}

export default preview
