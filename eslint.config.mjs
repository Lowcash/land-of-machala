import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import storybook from 'eslint-plugin-storybook'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-interfaces': [
        'warn',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-object-types': [
        'warn',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
    'storybook-static/**',
    'local/**',
  ]),
  ...storybook.configs['flat/recommended'],
])

export default eslintConfig
