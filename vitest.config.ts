/// <reference types="vitest" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { UserConfig as ViteUserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

type VitestConfig = ViteUserConfig & {
  test: {
    projects: Array<{
      extends?: true | string
      plugins?: Array<ReturnType<typeof storybookTest>>
      test: {
        name: string
        globals?: boolean
        environment?: string
        include?: string[]
        setupFiles?: string[]
        browser?: {
          enabled: boolean
          headless?: boolean
          provider: ReturnType<typeof playwright>
          instances: Array<{
            browser: 'chromium' | 'firefox' | 'webkit'
          }>
        }
      }
    }>
  }
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const config: VitestConfig = {
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },

  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'core',
          globals: true,
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
          setupFiles: ['./src/test/setup.ts'],
        },
      },
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
}

export default config
