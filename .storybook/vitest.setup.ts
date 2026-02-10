import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react'
import { beforeAll } from 'vitest'

import * as projectAnnotations from './preview'

// Apply the project annotations to the tests to ensure decorators (like fonts and themes) work
beforeAll(() => {
  setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
})
