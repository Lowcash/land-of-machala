import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/nextjs'
import * as projectAnnotations from './preview'

// Apply the project annotations to the tests to ensure decorators (like fonts and themes) work
beforeAll(() => {
  setProjectAnnotations(projectAnnotations)
})
