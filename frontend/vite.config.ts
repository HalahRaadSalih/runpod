// 'vite?-package' should be listed in the project's dependencies, not devDependencies

/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setupTests.ts',
    include: ['src/**/*.test.ts?(x)'],
    cache: false,
    silent: true
  }
})
