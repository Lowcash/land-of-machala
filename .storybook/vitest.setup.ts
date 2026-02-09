import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/nextjs'
import * as projectAnnotations from './preview'

// Apply the project annotations to the tests to ensure decorators (like fonts and themes) work
beforeAll(() => {
  setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
})
