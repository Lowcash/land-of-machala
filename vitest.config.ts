import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
<<<<<<< HEAD
    globals: true,
    setupFiles: ['./__tests__/setup.ts'],
    include: ['__tests__/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['app/actions/**/*.ts', 'entity/**/*.ts', 'lib/**/*.ts'],
      exclude: ['node_modules', '__tests__'],
=======
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: [
      'node_modules/',
      '.next/',
      '__tests__/e2e/**', // Playwright tests
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', '.next/', 'coverage/', '**/*.config.*', '**/*.d.ts', 'prisma/', '__tests__/'],
>>>>>>> origin/dev
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
